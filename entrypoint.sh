#!/bin/bash

set -e

# Inicia el servidor MySQL
mysqld --user=mysql --datadir=/var/lib/mysql --skip-networking=0 &

# Espera a que el servidor MySQL esté disponible
until mysqladmin ping -hlocalhost --silent; do
    sleep 1
done

# Ejecuta los comandos SQL para crear el usuario y concederle permisos
mysql -u root <<EOSQL
CREATE USER 'ivan'@'%' IDENTIFIED BY 'myPortfolio24';
GRANT ALL PRIVILEGES ON *.* TO 'ivan'@'%';
FLUSH PRIVILEGES;
EOSQL

# Detén el servidor MySQL para que pueda ser reiniciado por el entrypoint original
mysqladmin shutdown

# Ejecuta el entrypoint original del contenedor
exec "$@"
