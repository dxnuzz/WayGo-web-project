<?php
class Env
{
    private static $loaded = false;

    public static function load()
    {
        if (self::$loaded) {
            return;
        }
        $path = dirname(__DIR__, 2) . '/frontend/.env';
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) {
                    continue;
                }
                if (strpos($line, '=') !== false) {
                    [$name, $value] = explode('=', $line, 2);
                    putenv(trim($name) . '=' . trim($value, " \t\n\r\0\x0B\"'"));
                    $_ENV[trim($name)] = trim($value, " \t\n\r\0\x0B\"'");
                }
            }
        }
        self::$loaded = true;
    }

    public static function get($key, $default = null)
    {
        self::load();
        $val = getenv($key);
        return $val !== false ? $val : $_ENV[$key] ?? $default;
    }
}
?>
