#!/bin/bash
# /opt/tarifas/deploy.sh — único comando permitido a la clave SSH de GitHub Actions.
# Uso (desde Actions): ssh admin@host <ref>   (ref = rama o tag; por defecto main)
set -euo pipefail
exec 9>/opt/tarifas/.deploy.lock
flock -n 9 || { echo "Ya hay un despliegue en curso"; exit 1; }

REF="${SSH_ORIGINAL_COMMAND:-${1:-main}}"
[[ "$REF" =~ ^[A-Za-z0-9._/-]{1,100}$ ]] || { echo "ref no válida"; exit 2; }

cd /opt/tarifas/app
git fetch --quiet --prune origin
git checkout --quiet --detach "origin/$REF" 2>/dev/null || git checkout --quiet --detach "$REF"
echo "Desplegando $(git rev-parse --short HEAD) ($REF)"

docker compose build --pull
docker compose up -d --remove-orphans
for _ in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Host: tarifas.alinatal.es' -H 'X-Forwarded-Proto: https' http://127.0.0.1:"${APP_PORT:-8091}"/login || true)
  [ "$code" = 200 ] && { echo "OK /login=200"; exit 0; }
  sleep 2
done
echo "La app no responde en /login"; docker compose logs --tail=50 app; exit 1
