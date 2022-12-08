# Desafío 12 - Process
Se agrega a la app existente las rutas `localhost:8080/info` y `localhost:8080/api/randoms` según dicta el enunciado. Se cuenta con una colección postman para probar el backend con esas solicitudes.
Del lado del front-end, la aplicación cuenta con una única ruta `localhost:8080` que permite interactuar con todas las funcionalidades. Para ello es necesario estar registrado y logueado en el servidor, donde la persistencia de usuarios se realiza haciendo uso de Mongo Atlas. La app también cuenta con un chat en línea con todos los usuarios conectados.
Los productos cuentan con persistencia en MySQL usando Knex; los mensajes hacen uso de archivos .json.

## Ejecutar servidor
Una vez realizada la configuración de las herramientas e instalado las depeendencias, situarse en la raiz del proyecto y ejectuar en VSCode:
```
node . -p 8080
```
## Configuración

### Visual Studio Code
1. Instalar las dependencias
```
npm install
```
2. Crear un archivo en la raíz del proyecto, con el nombre `.env` y el siguiente contenido:
```
MONGO_URI='mongodb+srv://developer:x6JYg18ip3N7gsky@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority'
```
4. Opcional: situado en la raíz del proyecto, ejecutar el siguiente comando para inicializar la base de datos con tablas y elementos.
```
$env:MONGO_URI='mongodb+srv://developer:x6JYg18ip3N7gsky@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority'
node ./config/initDB.js
```