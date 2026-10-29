<?php

declare(strict_types=1);

// Testy formularza PHP (hosting/api/quote-lib.php). Uruchomienie: pnpm test:php
require __DIR__ . '/../../hosting/api/quote-lib.php';

$failures = 0;
function check(string $name, bool $ok): void
{
    global $failures;
    echo ($ok ? '✓ ' : '✗ ') . $name . "\n";
    if (!$ok) {
        $failures++;
    }
}

$valid = [
    'name' => 'Paweł',
    'email' => 'pawel@example.com',
    'phone' => '+44 7700 900123',
    'width' => '200',
    'height' => '150,5',
    'depth' => '60',
    'quantity' => '2',
    'deadline' => '',
    'description' => 'Logo kawiarni, około 20 cm szerokości, na ścianę.',
    'locale' => 'pl',
    'elapsed' => '45000',
    'extra_note' => '',
];

check('poprawne zapytanie przechodzi', quote_validate($valid)[1] === []);
check('przecinek w wymiarach zamienia się na kropkę', quote_validate($valid)[0]['height'] === '150.5');
check(
    'błędy pól mają klucze komunikatów',
    quote_validate(['name' => 'P', 'email' => 'nie-email', 'phone' => 'abc', 'quantity' => '0'])[1] === [
        'name' => 'name',
        'email' => 'email',
        'phone' => 'phone',
        'width' => 'size',
        'quantity' => 'quantity',
        'description' => 'description',
    ],
);
check('wymiar ponad 256 mm to błąd', quote_validate(['width' => '257'] + $valid)[1] === ['width' => 'size']);
check('brak wymiarów przechodzi z „nie znam wymiarów”', quote_validate(['width' => '', 'sizeUnsure' => 'on'] + $valid)[1] === []);
check('imię z nową linią to błąd', quote_validate(['name' => "Paweł\nBcc: x@y.z"] + $valid)[1] === ['name' => 'name']);
check('telefon jest opcjonalny', quote_validate(['phone' => ''] + $valid)[1] === []);

check('pole pułapka zatrzymuje bota', quote_spam_verdict(['extra_note' => 'x'] + $valid) === 'honeypot');
check('zbyt szybkie wysłanie zatrzymuje bota', quote_spam_verdict(['elapsed' => '800'] + $valid) === 'tooFast');
check('brak czasu wypełnienia zatrzymuje bota', quote_spam_verdict(['elapsed' => ''] + $valid) === 'tooFast');
check('człowiek przechodzi', quote_spam_verdict($valid) === 'ok');

$file = fn (string $name, int $size, int $error = UPLOAD_ERR_OK) => compact('name', 'size', 'error') + ['tmp' => ''];
check('obsługiwany plik przechodzi', quote_validate_files([$file('logo.svg', 1000)]) === null);
check('nieobsługiwany plik to błąd', quote_validate_files([$file('plik.exe', 10)]) === ['key' => 'fileType', 'file' => 'plik.exe']);
check('więcej niż 3 pliki to błąd', quote_validate_files(array_fill(0, 4, $file('a.png', 1))) === ['key' => 'fileCount']);
check('ponad 4 MB to błąd', quote_validate_files([$file('a.pdf', 5 * 1024 * 1024)]) === ['key' => 'fileSize']);
check('plik odrzucony przez PHP to błąd rozmiaru', quote_validate_files([$file('a.pdf', 0, UPLOAD_ERR_INI_SIZE)]) === ['key' => 'fileSize']);

check(
    'wszystkie pliki z files[] trafiają do zapytania',
    count(quote_files(['files' => [
        'name' => ['logo.svg', 'brief.pdf', ''],
        'size' => [10, 20, 0],
        'tmp_name' => ['/tmp/a', '/tmp/b', ''],
        'error' => [UPLOAD_ERR_OK, UPLOAD_ERR_OK, UPLOAD_ERR_NO_FILE],
    ]])) === 2,
);

$dir = sys_get_temp_dir() . '/glowbox-quote-test-' . bin2hex(random_bytes(4));
$start = 1_000_000;
$results = [];
for ($i = 0; $i < 6; $i++) {
    $results[] = quote_rate_limited($dir, '1.2.3.4', $start + $i);
}
check('limit zatrzymuje szóste zapytanie w 10 minut', $results === [false, false, false, false, false, true]);
check('inny adres ma własny limit', quote_rate_limited($dir, '5.6.7.8', $start + 10) === false);
check('limit mija po 10 minutach', quote_rate_limited($dir, '1.2.3.4', $start + 601) === false);
check('adres IP nie jest zapisany wprost', !str_contains((string) file_get_contents("$dir/rate-limit.json"), '1.2.3.4'));
array_map('unlink', glob("$dir/*"));
rmdir($dir);

[$subject, $body, $headers] = quote_build_email(
    quote_validate($valid)[0],
    [],
    ['from' => 'formularz@glowboxlab.com', 'from_name' => 'GlowBox Lab'],
);
check('temat jest zakodowany w UTF-8', str_contains($subject, '=?UTF-8?B?') && !str_contains($subject, "\n"));
check('odpowiedź trafia do klienta', str_contains($headers, 'Reply-To: pawel@example.com'));
$attachment = tempnam(sys_get_temp_dir(), 'glowbox');
file_put_contents($attachment, 'x');
[, $withFile] = quote_build_email(
    quote_validate($valid)[0],
    [['name' => 'logo żółte.svg', 'size' => 1, 'tmp' => $attachment, 'error' => UPLOAD_ERR_OK]],
    ['from' => 'formularz@glowboxlab.com', 'from_name' => 'GlowBox Lab'],
);
unlink($attachment);
check(
    'nazwa załącznika według RFC 2231 z zapasową nazwą ASCII',
    str_contains($withFile, "filename*=UTF-8''logo%20%C5%BC%C3%B3%C5%82te.svg")
        && str_contains($withFile, 'filename="logo_'),
);
check('treść ma wersję tekstową i HTML', str_contains($body, 'text/plain') && str_contains($body, 'text/html'));

echo $failures === 0 ? "\nWszystkie testy PHP przeszły.\n" : "\nNieudane testy: $failures\n";
exit($failures === 0 ? 0 : 1);
