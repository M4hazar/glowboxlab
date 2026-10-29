#!/usr/bin/env bash
# Podgląd zbudowanej strony (folder out) na Apache z PHP, tak jak na hostingu OVH.
# Wymaga apache2 i libapache2-mod-php (np. `sudo apt-get install apache2 libapache2-mod-php`).
# Użycie: PORT=3000 bash scripts/serve.sh
set -euo pipefail

PORT="${PORT:-3000}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)/out"
MODULES=/usr/lib/apache2/modules
PHP_MODULE="$(ls "$MODULES" | grep -m1 -E '^libphp.*\.so$')"
RUN_DIR="$(mktemp -d)"

cat > "$RUN_DIR/httpd.conf" <<CONF
ServerRoot "$RUN_DIR"
ServerName localhost
Listen $PORT
PidFile "$RUN_DIR/httpd.pid"
ErrorLog "|/bin/cat"
LoadModule mpm_prefork_module $MODULES/mod_mpm_prefork.so
LoadModule authz_core_module $MODULES/mod_authz_core.so
LoadModule mime_module $MODULES/mod_mime.so
LoadModule dir_module $MODULES/mod_dir.so
LoadModule rewrite_module $MODULES/mod_rewrite.so
LoadModule headers_module $MODULES/mod_headers.so
LoadModule deflate_module $MODULES/mod_deflate.so
LoadModule filter_module $MODULES/mod_filter.so
LoadModule env_module $MODULES/mod_env.so
LoadModule php_module $MODULES/$PHP_MODULE
TypesConfig /etc/mime.types
DocumentRoot "$ROOT"
DirectoryIndex index.html
<Directory "$ROOT">
  AllowOverride All
  Require all granted
</Directory>
<FilesMatch "\.php$">
  SetHandler application/x-httpd-php
</FilesMatch>
SetEnv QUOTE_DRY_RUN "${QUOTE_DRY_RUN:-0}"
CONF

# Apache uruchomiony jako root przechodzi na zwykłego użytkownika serwera.
if [ "$(id -u)" = 0 ]; then
  printf 'User www-data\nGroup www-data\n' >> "$RUN_DIR/httpd.conf"
fi

echo "GlowBox Lab: http://localhost:$PORT"
# Apache we własnej grupie procesów, bo przy zamykaniu wysyła sygnał całej grupie
# (zabiłby też Playwrighta albo Lighthouse). Zamknięcie skryptu zamyka Apache.
setsid apache2 -f "$RUN_DIR/httpd.conf" -DFOREGROUND &
APACHE_PID=$!
trap 'kill -TERM "$APACHE_PID" 2>/dev/null; wait "$APACHE_PID"; rm -rf "$RUN_DIR"' EXIT
trap 'exit 0' TERM INT HUP
wait "$APACHE_PID"
