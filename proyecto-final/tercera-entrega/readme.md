# Proyecto Final - segunda entrega
La funcionalidad del servidor puede ser probada mediante una app desarrollada para el front-end, ingresando a la ruta `localhost:8080` en un navegador. Esta app realiza CRUDs tanto para las funcionalidades de los productos, como las del carrito de compras.
El servidor genera mensajes en consola con cada solicitud recibida para control del funcionamiento, permitiendo una trazabilidad de los eventos.
Las peticiones también pueden ser probadas mediante una collección de `postman` en la carpeta postman, en el directorio raíz.

## Ejecutar servidor
```
npm start
```
Luego ingresar a la siguiente ruta para probar las funcionalidades de la app:
```
localhost:8080
```

## Inicializar DB
Esto es opcional, en caso de querer llevar la inicializar la DB con sus valores originales (10 productos iniciales y ningún carrito de compras creado).
### WSL
```
node ./config/initDB.js
```

## Configuración

1. Crear un archivo en la raíz del proyecto, con el nombre `.env` y el siguiente contenido:
```
PORT=8080
```
2. Instalar las dependencias
```
npm install
```
3. Configurar el modo de persistencia de la información deseado en el `package.json`:
### WSL
```
"start": "PERSISTANCE_TYPE=<choose> node ."
```
### Windows
```
"start": "set PERSISTANCE_TYPE=<choose>&& node ."
```
Las opciones para PERSISTANCE_TYPE son `mongodb`, `firebase`, `filesystem` o `memory`.

4. En el directorio `./config`. Modificar el campo `ADMIN` con valores true o false según los permisos que se desee establecer para la administración de los productos.
```
const variables = {
    ADMIN: true,    // Modificar según sea necesario
    STATUS: STATUS
}
```