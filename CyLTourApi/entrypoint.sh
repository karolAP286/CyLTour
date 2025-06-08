#!/bin/bash

# Wait for MySQL to be ready
echo "Waiting for MySQL..."

until mysql -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" -e "SELECT 1;" 2>/dev/null; do
  echo "MySQL not ready - sleeping"
  sleep 10
done

composer install 
php artisan config:clear
php artisan key:generate
php artisan migrate --force

echo "MySQL is up - running migrations and starting server..."

# Start Apache
exec apache2-foreground