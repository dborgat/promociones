FROM php:8.2-fpm

WORKDIR /var/www

# Actualizar e instalar dependencias del sistema
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
    sqlite3 \ 
    libsqlite3-dev 

# Configurar extensiones de PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Instalar extensiones de PHP
RUN docker-php-ext-install gd
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install pdo_sqlite
RUN docker-php-ext-install zip 

# Instalar y habilitar Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Limpiar cache de apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs

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

# Exponer los puertos para PHP-FPM 
EXPOSE 9000 8000

# Configurar el script de entrada
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
