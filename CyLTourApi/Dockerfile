# Laravel backend
FROM php:8.2-apache

WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

COPY . .

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install

EXPOSE 8000
