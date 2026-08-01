<?php
// Скрипт исправляет потерянные расширения файлов в assets/portfolio.
// Запусти один раз через браузер: https://ai-prodaction.ru/fix_extensions.php
// После выполнения удали этот файл с сервера.

$baseDir = __DIR__ . '/assets/portfolio';

function normalizeExtension($ext) {
  $map = [
    'jpeg' => 'jpg',
    'mpeg' => 'mp3',
  ];
  return isset($map[$ext]) ? $map[$ext] : $ext;
}

function fixFiles($dir, $knownExtensions) {
  $fixed = [];
  $items = scandir($dir);
  if (!$items) return $fixed;

  foreach ($items as $item) {
    if ($item === '.' || $item === '..') continue;
    $path = $dir . '/' . $item;

    if (is_dir($path)) {
      $fixed = array_merge($fixed, fixFiles($path, $knownExtensions));
      continue;
    }

    // Уже есть расширение
    if (preg_match('/\.([a-zA-Z0-9]+)$/', $item)) {
      continue;
    }

    // Определяем тип по MIME
    $mime = mime_content_type($path);
    $ext = '';
    if (preg_match('/video\/mp4/', $mime)) {
      $ext = 'mp4';
    } elseif (preg_match('/audio\/mpeg/', $mime) || $mime === 'audio/mp3') {
      $ext = 'mp3';
    } elseif (preg_match('/image\/png/', $mime)) {
      $ext = 'png';
    } elseif (preg_match('/image\/jpeg/', $mime)) {
      $ext = 'jpg';
    } elseif (preg_match('/image\/gif/', $mime)) {
      $ext = 'gif';
    } elseif (preg_match('/image\/webp/', $mime)) {
      $ext = 'webp';
    } else {
      // Если MIME не определился, пробуем magic bytes
      $handle = fopen($path, 'rb');
      if ($handle) {
        $header = fread($handle, 16);
        fclose($handle);
        if (strpos($header, 'ftyp') !== false) $ext = 'mp4';
        elseif (strpos($header, 'PNG') === 0) $ext = 'png';
        elseif (strpos($header, '\xFF\xD8\xFF') === 0) $ext = 'jpg';
        elseif (strpos($header, 'ID3') === 0 || strpos($header, '\xFF\xFB') === 0) $ext = 'mp3';
      }
    }

    if ($ext) {
      $newName = $item . '.' . $ext;
      $newPath = $dir . '/' . $newName;
      if (!file_exists($newPath)) {
        rename($path, $newPath);
        $fixed[] = str_replace(__DIR__ . '/', '', $newPath);
      } else {
        $fixed[] = "SKIP (exists): " . str_replace(__DIR__ . '/', '', $newPath);
      }
    } else {
      $fixed[] = "UNKNOWN: " . str_replace(__DIR__ . '/', '', $path) . " (mime: $mime)";
    }
  }

  return $fixed;
}

$extensions = ['mp4', 'mp3', 'png', 'jpg', 'jpeg', 'gif', 'webp'];
$fixed = fixFiles($baseDir, $extensions);

header('Content-Type: text/plain; charset=utf-8');
echo "Файлов исправлено: " . count(array_filter($fixed, function($f){ return !str_starts_with($f, 'SKIP') && !str_starts_with($f, 'UNKNOWN'); })) . "\n\n";
foreach ($fixed as $f) {
  echo $f . "\n";
}
echo "\nНе забудь удалить этот скрипт (fix_extensions.php) после запуска.\n";
