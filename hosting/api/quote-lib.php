<?php

declare(strict_types=1);

// Sprawdzanie i wysyłka zapytania o wycenę. Reguły odpowiadają schematowi Zod
// w src/lib/quote-schema.ts (formularz sprawdza je najpierw w przeglądarce),
// a odpowiedzi typowi QuoteState z src/lib/quote-client.ts.

const QUOTE_HONEYPOT_FIELD = 'extra_note';
const QUOTE_ELAPSED_FIELD = 'elapsed';
const QUOTE_MIN_FILL_MS = 3000;
const QUOTE_RATE_LIMIT = 5;
const QUOTE_RATE_WINDOW_S = 600;
const QUOTE_MAX_SIZE_MM = 256;
const QUOTE_MAX_FILES = 3;
const QUOTE_MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const QUOTE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'pdf', 'ai', 'eps'];

function quote_text(array $post, string $key): string
{
    $value = $post[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function quote_length(string $value): int
{
    return mb_strlen($value, 'UTF-8');
}

/** Pułapka i zbyt szybkie wysłanie: 'ok', 'honeypot' albo 'tooFast'. */
function quote_spam_verdict(array $post): string
{
    if (quote_text($post, QUOTE_HONEYPOT_FIELD) !== '') {
        return 'honeypot';
    }
    $elapsed = quote_text($post, QUOTE_ELAPSED_FIELD);
    if (!is_numeric($elapsed) || (float) $elapsed < QUOTE_MIN_FILL_MS) {
        return 'tooFast';
    }
    return 'ok';
}

function quote_dimension_ok(string $value): bool
{
    if ($value === '') {
        return true;
    }
    $number = str_replace(',', '.', $value);
    if (!is_numeric($number)) {
        return false;
    }
    $mm = (float) $number;
    return $mm > 0 && $mm <= QUOTE_MAX_SIZE_MM;
}

/**
 * Zwraca [dane, błędy pól]. Błąd to klucz komunikatu z `quote.errors` w słownikach.
 */
function quote_validate(array $post): array
{
    $data = [
        'name' => quote_text($post, 'name'),
        'email' => quote_text($post, 'email'),
        'phone' => quote_text($post, 'phone'),
        'width' => str_replace(',', '.', quote_text($post, 'width')),
        'height' => str_replace(',', '.', quote_text($post, 'height')),
        'depth' => str_replace(',', '.', quote_text($post, 'depth')),
        'sizeUnsure' => ($post['sizeUnsure'] ?? '') === 'on',
        'quantity' => quote_text($post, 'quantity'),
        'deadline' => mb_substr(quote_text($post, 'deadline'), 0, 20, 'UTF-8'),
        'description' => quote_text($post, 'description'),
        'locale' => quote_text($post, 'locale'),
    ];
    $errors = [];

    $nameLength = quote_length($data['name']);
    // Imię trafia do tematu e-maila, więc bez znaków sterujących (np. nowej linii).
    if ($nameLength < 2 || $nameLength > 80 || preg_match('/\p{Cc}/u', $data['name']) !== 0) {
        $errors['name'] = 'name';
    }
    if (
        quote_length($data['email']) > 160
        || filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false
    ) {
        $errors['email'] = 'email';
    }
    if (
        quote_length($data['phone']) > 30
        || ($data['phone'] !== '' && !preg_match('/^[+()\d\s-]{7,}$/', $data['phone']))
    ) {
        $errors['phone'] = 'phone';
    }
    foreach (['width', 'height', 'depth'] as $field) {
        if (!quote_dimension_ok($data[$field])) {
            $errors[$field] = 'size';
        }
    }
    $missingSize = in_array('', [$data['width'], $data['height'], $data['depth']], true);
    if (!$data['sizeUnsure'] && $missingSize && !isset($errors['width'])) {
        $errors['width'] = 'size';
    }
    $quantity = $data['quantity'];
    if (
        !preg_match('/^\d+$/', $quantity)
        || (int) $quantity < 1
        || (int) $quantity > 500
    ) {
        $errors['quantity'] = 'quantity';
    }
    $descriptionLength = quote_length($data['description']);
    if ($descriptionLength < 20 || $descriptionLength > 3000) {
        $errors['description'] = 'description';
    }
    if (!in_array($data['locale'], ['en', 'pl'], true)) {
        $data['locale'] = 'en';
    }
    $data['quantity'] = (int) $quantity;

    return [$data, $errors];
}

/**
 * Załączniki z $_FILES['files'] jako lista [name, size, tmp, error].
 * Puste pola (bez wybranego pliku) są pomijane.
 */
function quote_files(array $files): array
{
    $upload = $files['files'] ?? null;
    if (!is_array($upload) || !isset($upload['name'])) {
        return [];
    }
    $out = [];
    foreach ((array) $upload['name'] as $i => $name) {
        $error = (int) ((array) $upload['error'])[$i];
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        $out[] = [
            'name' => basename((string) $name),
            'size' => (int) ((array) $upload['size'])[$i],
            'tmp' => (string) ((array) $upload['tmp_name'])[$i],
            'error' => $error,
        ];
    }
    return $out;
}

/** Błąd załączników w formacie { key, file? } albo null. */
function quote_validate_files(array $files): ?array
{
    if (count($files) > QUOTE_MAX_FILES) {
        return ['key' => 'fileCount'];
    }
    foreach ($files as $file) {
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, QUOTE_EXTENSIONS, true)) {
            return ['key' => 'fileType', 'file' => $file['name']];
        }
    }
    $total = 0;
    foreach ($files as $file) {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['key' => 'fileSize'];
        }
        $total += $file['size'];
    }
    return $total > QUOTE_MAX_TOTAL_BYTES ? ['key' => 'fileSize'] : null;
}

/**
 * Limit zapytań z jednego adresu IP. Adres zapisujemy tylko jako skrót (hash),
 * a wpisy starsze niż okno limitu znikają przy każdym zapisie.
 */
function quote_rate_limited(string $dir, string $ip, ?int $now = null): bool
{
    $now ??= time();
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return false;
    }
    $handle = @fopen($dir . '/rate-limit.json', 'c+');
    if ($handle === false) {
        return false;
    }
    flock($handle, LOCK_EX);
    $hits = json_decode((string) stream_get_contents($handle), true);
    $hits = is_array($hits) ? $hits : [];
    $key = hash('sha256', $ip . '|' . __DIR__);
    foreach ($hits as $hashed => $times) {
        $hits[$hashed] = array_values(array_filter(
            (array) $times,
            fn ($t) => $now - (int) $t < QUOTE_RATE_WINDOW_S,
        ));
        if ($hits[$hashed] === []) {
            unset($hits[$hashed]);
        }
    }
    $recent = $hits[$key] ?? [];
    $limited = count($recent) >= QUOTE_RATE_LIMIT;
    if (!$limited) {
        $recent[] = $now;
        $hits[$key] = $recent;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string) json_encode($hits));
    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited;
}

/** Wiersze podsumowania zapytania: [etykieta, wartość]. */
function quote_summary(array $data): array
{
    $dims = array_map(
        fn ($v) => $v === '' ? '?' : $v,
        [$data['width'], $data['height'], $data['depth']],
    );
    $given = implode(' × ', $dims) . ' mm (W × H × D)';
    $anyGiven = ($data['width'] . $data['height'] . $data['depth']) !== '';
    $size = !$data['sizeUnsure']
        ? $given
        : ($anyGiven ? "$given, not sure, wants advice" : 'Not sure, wants advice');
    return [
        ['Name', $data['name']],
        ['Email', $data['email']],
        ['Phone', $data['phone'] !== '' ? $data['phone'] : 'n/a'],
        ['Language', strtoupper($data['locale'])],
        ['Size', $size],
        ['Quantity', (string) $data['quantity']],
        ['Needed by', $data['deadline'] !== '' ? $data['deadline'] : 'n/a'],
    ];
}

/** Nagłówek z polskimi znakami (RFC 2047), w jednej linii. */
function quote_header_text(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function quote_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Składa wiadomość MIME (tekst, HTML i załączniki). Zwraca [temat, treść, nagłówki].
 */
function quote_build_email(array $data, array $files, array $config): array
{
    $summary = quote_summary($data);
    $rows = '';
    $text = '';
    foreach ($summary as [$label, $value]) {
        $rows .= '<tr><td style="padding:4px 12px 4px 0;color:#667"><b>' . quote_escape($label)
            . '</b></td><td style="padding:4px 0">' . quote_escape($value) . '</td></tr>';
        $text .= "$label: $value\n";
    }
    $text .= "\nIdea:\n" . $data['description'] . "\n";
    $count = count($files);
    $html = '<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">'
        . '<h2 style="margin:0 0 12px">New quote request</h2><table>' . $rows . '</table>'
        . '<h3 style="margin:20px 0 6px">Idea</h3>'
        . '<p style="white-space:pre-wrap;margin:0">' . quote_escape($data['description']) . '</p>'
        . '<p style="color:#667;margin-top:20px">' . $count
        . ' attachment(s). Reply to this email to answer the client.</p></div>';

    $mixed = 'mixed_' . bin2hex(random_bytes(12));
    $alt = 'alt_' . bin2hex(random_bytes(12));
    $body = "--$mixed\r\n"
        . "Content-Type: multipart/alternative; boundary=\"$alt\"\r\n\r\n"
        . "--$alt\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text))
        . "--$alt\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$alt--\r\n";
    foreach ($files as $file) {
        $content = (string) file_get_contents($file['tmp']);
        $name = quote_header_text($file['name']);
        $body .= "--$mixed\r\n"
            . "Content-Type: application/octet-stream; name=\"$name\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . "Content-Disposition: attachment; filename=\"$name\"\r\n\r\n"
            . chunk_split(base64_encode($content));
    }
    $body .= "--$mixed--\r\n";

    $fromName = quote_header_text($config['from_name']);
    $headers = implode("\r\n", [
        "From: $fromName <{$config['from']}>",
        "Reply-To: {$data['email']}",
        'MIME-Version: 1.0',
        "Content-Type: multipart/mixed; boundary=\"$mixed\"",
    ]);
    $subject = quote_header_text('Quote request: ' . $data['name']);
    return [$subject, $body, $headers];
}

/** Cała obsługa zapytania. Zwraca odpowiedź w formacie QuoteState. */
function quote_handle(array $post, array $rawFiles, string $ip, array $config): array
{
    // Pułapka i zbyt szybkie wysłanie: udajemy sukces, żeby bot nie próbował dalej.
    $verdict = quote_spam_verdict($post);
    if ($verdict !== 'ok') {
        error_log("[quote] Blocked as spam ($verdict).");
        return ['status' => 'success', 'name' => ''];
    }

    [$data, $errors] = quote_validate($post);
    $files = quote_files($rawFiles);
    $fileError = quote_validate_files($files);
    if ($errors !== [] || $fileError !== null) {
        $response = ['status' => 'error', 'errors' => (object) $errors];
        if ($fileError !== null) {
            $response['fileError'] = $fileError;
        }
        return $response;
    }

    if (!empty($config['dry_run'])) {
        error_log('[quote] Dry run, not sent: ' . json_encode(quote_summary($data)));
        return ['status' => 'success', 'name' => $data['name']];
    }

    // Seria zapytań z jednego adresu: zwykły błąd z podpowiedzią, żeby napisać inaczej.
    if ($ip !== '' && quote_rate_limited($config['data_dir'], $ip)) {
        error_log('[quote] Rate limit reached.');
        return ['status' => 'failed'];
    }

    [$subject, $body, $headers] = quote_build_email($data, $files, $config);
    $to = implode(', ', array_map('trim', explode(',', $config['to'])));
    $sent = mail($to, $subject, $body, $headers, '-f' . $config['from']);
    if (!$sent) {
        error_log('[quote] mail() failed.');
        return ['status' => 'failed'];
    }
    return ['status' => 'success', 'name' => $data['name']];
}
