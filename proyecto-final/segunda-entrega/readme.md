# Proyecto Final - primera entrega
La funcionalidad del servidor puede ser probada mediante una app desarrollada para el front-end, ingresando a la ruta `localhost:8080` en un navegador. Esta app realiza fetch al servidor con métodos GET, POST, DELETE y PUT tanto para las funcionalidades de los productos, como las del carrito de compras.
El servidor genera mensajes en consola con cada solicitud recibida para control del funcionamiento.
Las peticiones también pueden ser probadas mediante una collección de `postman` en la carpeta postman, en el directorio raíz.

## Ejecutar servidor
```
npm start
```
Luego ingresar a la siguiente ruta para probar las funcionalidades de la app:
```
localhost:8080
```
El comando `npm run dev` ejecuta nodemon y también es válido, pero al interactuar sobre los productos o el carrito de compras, el servidor se reiniciará constantemente. Dado que todos los cambios son registrados en archivos.

## Configuración

1. Crear un archivo en la raíz del proyecto, con el nombre `.env` y el siguiente contenido:
```
PORT=8080
```
2. Instalar las dependencias
```
npm install
```
3. En el directorio `./config` se encuentra el archivo `variables.js`. Modificar la variable `ADMIN` según los permisos que se desee establecer sobre la administración de los productos.
```
ADMIN = true; // modificar según sea necesario
```