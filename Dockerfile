FROM php:8.2-fpm

WORKDIR /var/www

# Instalar dependencias del sistema y extensiones de PHP necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libjpeg-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    netcat-openbsd \
    default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install pdo_sqlite \
    && docker-php-ext-install zip \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/

# Copiar Composer desde la imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar el código de la aplicación al contenedor
COPY . .

# Instalar dependencias de PHP
RUN composer install

# Instalar dependencias de Node.js
RUN npm install

# Copiar el script de entrada
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Dar permisos de ejecución al script de entrada
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exponer los puertos para PHP-FPM y Vite
EXPOSE 9000 8000 3000

# Configurar el script de entrada
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
