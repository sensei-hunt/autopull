<?php
// ── Ronin Session Logger ───────────────────────────────────────────────────
// Receives a JSON POST from the frontend after each execution session.
// Writes a timestamped .txt file to /logs/ for admin review.
// The /logs/ directory is protected by .htaccess — not publicly accessible.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["ok" => false, "error" => "POST only"]);
    exit;
}

$raw  = file_get_contents("php://input");
$body = json_decode($raw, true);

$wallet = isset($body['wallet']) ? preg_replace('/[^a-fA-F0-9x]/', '', $body['wallet']) : '';
$log    = isset($body['log']) && is_array($body['log']) ? $body['log'] : [];

if (empty($wallet) || empty($log)) {
    echo json_encode(["ok" => false, "error" => "Missing wallet or log"]);
    exit;
}

// Ensure logs directory exists
$logsDir = __DIR__ . "/logs";
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0750, true);
    // Write .htaccess to block direct HTTP access
    file_put_contents($logsDir . "/.htaccess",
        "Order deny,allow\nDeny from all\n");
}

// Build log file content
$timestamp = date('Y-m-d H:i:s T');
$datePart  = date('Y-m-d_H-i-s');
$shortAddr = strtolower(substr($wallet, 0, 10));
$filename  = $logsDir . "/{$datePart}_{$shortAddr}.txt";

$lines   = [];
$lines[] = str_repeat("=", 72);
$lines[] = "  RONIN SESSION LOG";
$lines[] = "  Wallet    : " . strtolower($wallet);
$lines[] = "  Saved at  : " . $timestamp;
$lines[] = "  Entries   : " . count($log);
$lines[] = str_repeat("=", 72);
$lines[] = "";

$type_map = [
    "info"    => "INFO   ",
    "scan"    => "SCAN   ",
    "zero"    => "ZERO   ",
    "found"   => "FOUND  ",
    "exec"    => "EXEC   ",
    "approve" => "APPROVE",
    "tx"      => "TX     ",
    "success" => "SUCCESS",
    "skip"    => "SKIP   ",
    "warn"    => "WARN   ",
    "error"   => "ERROR  ",
    "event"   => "EVENT  ",
];

foreach ($log as $entry) {
    $ts      = isset($entry['ts'])      ? $entry['ts']      : "?";
    $type    = isset($entry['type'])    ? $entry['type']    : "?";
    $message = isset($entry['message']) ? $entry['message'] : "";
    $data    = isset($entry['data'])    ? $entry['data']    : null;

    $typeLabel = isset($type_map[$type]) ? $type_map[$type] : strtoupper(substr($type, 0, 7));
    $line = "[{$ts}] [{$typeLabel}] {$message}";
    $lines[] = $line;

    if ($data && !empty($data)) {
        // Print data fields on next line, indented
        $lines[] = "         " . json_encode($data, JSON_UNESCAPED_SLASHES);
    }
}

$lines[] = "";
$lines[] = str_repeat("=", 72);
$lines[] = "  END OF LOG";
$lines[] = str_repeat("=", 72);

$written = file_put_contents($filename, implode("\n", $lines) . "\n");

if ($written === false) {
    echo json_encode(["ok" => false, "error" => "Could not write log file"]);
    exit;
}

echo json_encode([
    "ok"   => true,
    "file" => basename($filename),
    "size" => $written,
]);
