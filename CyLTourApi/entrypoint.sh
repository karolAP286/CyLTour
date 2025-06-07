#!/bin/bash
set -e

echo "Esperando que la base de datos esté disponible..."

until php artisan migrate:status > /dev/null 2>&1; do
  echo "Esperando a la base de datos..."
  sleep 3
done

echo "Ejecutando migraciones..."
php artisan migrate --force

echo "Iniciando Apache..."
apache2-foreground

