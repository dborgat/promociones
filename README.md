# Proyecto de Promociones - Hotelinking Challenge

## Descripción

Este proyecto es una aplicación web desarrollada con Laravel y React que permite gestionar promociones.

## Requisitos

- Docker
- Docker Compose
- Composer
- Node.js y npm

## Configuración

### Clonar el repositorio

```bash
git clone https://github.com/tuusuario/tu-repositorio.git
cd tu-repositorio
```
### Instalar dependencias

```bash
composer install
npm install
```

### Configurar archivo .env
```bash
cp .env.example .env
```
### Copiar y pegar en el archivo .env en la parte de DB
```bash
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=promociones
DB_USERNAME=root
DB_PASSWORD=secret
```
### Luego de guardar el archivo .env
```bash
php artisan key:generate
```
(esto te modifica el .env en la parte de APP_KEY

### Agregar puerto 8000
```bash
APP_URL=http://localhost:8000
```
### Levantar Frontend
```bash
npm run dev
```
Esto levanta el fronten en el puerto 3000

### Levantar el Backend
```bash
composer sail:build
```

levanta la app en en puerto 8000. 🤙

### Consideraciones a tener en cuenta
1- con el comando "composer sail:up" no solo crea la base de datos y las tablas sino que tambien hace un seed de la informacion que necesitamos para las ofertas.
2- no tiene usuarios de prueba, asi que registrate, logueate y disfruta de los descuentos 🥇

### Comandos Útiles
Para facilitar el uso de Sail, se han creado algunos alias en el archivo composer.json:
# Levantar la aplicación:
```bash
composer sail:up
```
# Apagar la aplicación:
```bash
composer sail:down
```

### Notas
- Asegúrate de que Docker y Docker Compose estén corriendo antes de ejecutar Sail.
- Si encuentras problemas con los puertos, asegúrate de que no haya otros servicios utilizando los mismos puertos.



David Borgat 😄
