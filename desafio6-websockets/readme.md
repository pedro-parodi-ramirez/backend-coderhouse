# Desafío 6 - Websockets
La aplicación cuenta con una única ruta para interactuar `localhost:3000`, desde la cual es posible visualizar los productos disponibles y agregar nuevos productos. También cuenta con un chat en línea con todos los usuarios conectados.

## Funcionamiento

### Formulario
Realiza método **post** a `localhost:3000/api/productos`. Se agrega nuevo producto a la DB y este se emite, haciendo uso de websockets, a todos los usuarios conectados.

### Lista de productos
Lista con todos los productos. Al inicio del servidor, se cuenta con tres productos, los cuales son obtenidos por los clientes a través de una solicitud **get** a `localhost:3000/api/productos`. Esta solicitud retorna un json con los productos iniciales.

### Centro de mensajes
Chat en línea con todos los usuarios conectados. Se deja registro del historial de mensajes en un archivo txt en la carpeta `config`.


## Configuración

1. El paquete nodemon debe instalarse de forma global. Caso contrario, modificar la ruta según corresponda para el comando `npm run dev` dentro del archivo `package.json`:
```
"script":{
    "dev": "nodemon --exec 'node -r dotenv/config' ./app.js"
}
```
2. Crear un archivo en la raíz del proyecto, con el nombre `.env` y el siguiente contenido:
```
PORT=3000
ENV=local
```
3. Instalar las dependencias
```
npm install
```

## Ejecutar servidor
```
npm run dev
```
Luego ingresar a la siguiente ruta para probar las funcionalidades de la app:
```
localhost:3000
```