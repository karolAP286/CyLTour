# Laravel backend
FROM php:8.2-apache

WORKDIR /var/www

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

# Habilita mod_rewrite
RUN a2enmod rewrite

# Copia proyecto
COPY . .

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Cache de configuración Laravel
RUN php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache

# Expose innecesario si no sirve desde aquí
