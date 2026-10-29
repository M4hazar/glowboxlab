<?php

declare(strict_types=1);

// Formularz wyceny wysyła tu zapytanie (POST, multipart). Odpowiedź w JSON.
require __DIR__ . '/quote-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['status' => 'failed']);
    exit;
}

$config = require __DIR__ . '/config.php';
$config['data_dir'] ??= __DIR__ . '/data';
// Tylko testy automatyczne: zapytanie trafia do logu zamiast na e-mail.
if (($_SERVER['QUOTE_DRY_RUN'] ?? getenv('QUOTE_DRY_RUN')) === '1') {
    $config['dry_run'] = true;
}

$response = quote_handle($_POST, $_FILES, (string) ($_SERVER['REMOTE_ADDR'] ?? ''), $config);
echo json_encode($response, JSON_UNESCAPED_UNICODE);
