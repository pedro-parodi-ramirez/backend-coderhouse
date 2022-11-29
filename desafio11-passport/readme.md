# Desafío 11 - Passport
La aplicación cuenta con una única ruta para interactuar `localhost:3000`, desde la cual es posible visualizar los productos disponibles y agregar nuevos productos. Para ello es necesario estar registrado y logueado en el servidor, donde la persistencia de usuarios se realiza haciendo uso de Mongo Atlas. La app también cuenta con un chat en línea con todos los usuarios conectados.
Los productos cuentan con persistencia en MySQL usando Knex; los mensajes hacen uso de archivos .json.

## Ejecutar servidor
Una vez realizada la configuración de las herramientas e instalado las depeendencias, ejectuar en VSCode:
```
npm run dev
```
O bien
```
$env:MONGO_URI='mongodb+srv://developer:x6JYg18ip3N7gsky@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority'
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
MONGO_URI='mongodb+srv://developer:x6JYg18ip3N7gsky@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority'
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
$env:MONGO_URI='mongodb+srv://developer:x6JYg18ip3N7gsky@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority'
node ./config/initDB.js
```