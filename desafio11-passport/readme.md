# Desafío 9 - Mocks y Normalizr
La aplicación cuenta con una única ruta para interactuar `localhost:3000`, desde la cual es posible visualizar los productos disponibles y agregar nuevos productos. También cuenta con un chat en línea con todos los usuarios conectados.
Los productos cuentan con persistencia en MySQL usando Knex; los mensajes hacen uso de archivos.

## Ejecutar servidor
Una vez realizada la configuración de las herramientas e instalado las depeendencias, ejectuar en VSCode:
```
npm start
```
Luego ingresar a la siguiente ruta para probar las funcionalidades de la app:
```
localhost:3000
```

## Configuración

### MariaDB
1. Iniciar el servicio de XAMPP.

2. Crear el schema de MySQL a utilizar como base de datos para los productos. En la CLI, una vez iniciado el servicio de MariaDB en `puerto` y `password` de preferencia, ejecutar los siguiente comandos:
```
CREATE SCHEMA ecommerce_products;
```
Corroborar que se haya creado la base de datos:
```
SHOW DATABASES;
```

### Visual Studio Code
1. Instalar las dependencias
```
npm install
```
2. Crear un archivo en la raíz del proyecto, con el nombre `.env` y el siguiente contenido:
```
PORT=3000
```
3. Modificar el valor de `port` y `password` en el archivo `./config/config.js` según el puerto en el cual se haya creado la base de datos con MySQL y según la configuración de XAMMP. Para este trabajo, se utilizó el puerto 3307 y contraseña nula.
```
sql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'ecommerce_products'
        }
    }
```

4. Opcional: situado en la raíz del proyecto, ejecutar el siguiente comando para inicializar la base de datos con tablas y elementos.
```
node ./db/initDB.js
```