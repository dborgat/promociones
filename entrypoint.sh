#!/bin/sh

# Espera a que la base de datos MySQL esté disponible
echo "Waiting for MySQL to be ready..."
until nc -z -v -w30 mysql 3306
do
  echo "Waiting for MySQL database connection..."
  sleep 1
done
echo "MySQL is up and running."

# Verifica si la base de datos existe
DB_EXISTS=$(mysql -h mysql -u root -p${DB_PASSWORD} -e "SHOW DATABASES LIKE '${DB_DATABASE}';" | grep "${DB_DATABASE}")

if [ "$DB_EXISTS" ]; then
  echo "La base de datos existe. Borrando tablas, ejecutando migraciones y seeders..."
  php artisan migrate:fresh --seed
else
  echo "La base de datos no existe. Creando base de datos, ejecutando migraciones y seeders..."
  mysql -h mysql -u root -p${DB_PASSWORD} -e "CREATE DATABASE ${DB_DATABASE};"
  php artisan migrate --seed
fi

# Verifica si la base de datos de pruebas existe
TEST_DB_EXISTS=$(mysql -h mysql -u root -p${DB_PASSWORD} -e "SHOW DATABASES LIKE 'promociones_test';" | grep "promociones_test")

if [ "$TEST_DB_EXISTS" ]; then
  echo "La base de datos de pruebas promociones_test existe."
else
  echo "La base de datos de pruebas promociones_test no existe. Creando base de datos..."
  mysql -h mysql -u root -p${DB_PASSWORD} -e "CREATE DATABASE promociones_test;"
  php artisan migrate --env=testing
fi

# Inicia el servidor PHP-FPM en segundo plano
php-fpm &

# Inicia el servidor de desarrollo de Laravel en segundo plano
php artisan serve --host=0.0.0.0 --port=8000 

# # Inicia el servidor de desarrollo de Vite
# npm run dev -- --host

# Mantén el contenedor en ejecución
exec "$@"
#
