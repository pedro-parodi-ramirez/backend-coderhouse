# Desafío 4 - APIRESTful
El programa inicia leyendo un archivo `package.json` con 3 productos y almacenándolos en un array. Luego, se trabaja sobre este array según peticiones al servidor GET, POST, PUT y DELETE.

## Configuración

1. El paquete nodemon debe instalarse de forma global. Caso contrario, modificar la ruta según corresponda para el comando `npm run dev` dentro del archivo `package.json`:
```
"script":{
    "dev": "nodemon --exec 'node -r dotenv/config' ./index.js"
}
```
2. Crear un archivo en la raíz del proyecto, con el nombre `.env` y el siguiente contenido:
```
NODE_PORT=8080
```
## Ejecutar servidor
```
npm run dev
```
## Peticiones al servidor
La totalidad de las peticiones se pueden probar a través de Postman. Para facilitar esta prueba, se deja en el directorio raíz una carpeta `postman` con un archivo `postman_collection.json` que se puede importar directamente desde Postman. Las peticiones disponibles son:

* **get all products**: retorna todos los productos.
* **get by ID**: retorna el producto según el `id` especificado en la url.
* **add product**: agrega un producto al array de productos y lo retorna. Debe completarse correctamente la información en el `body` de la petición en Postman.
* **replace by ID**: reemplaza un producto según `id` especificado en url. Debe completarse correctamente la información en el `body` de la petición en Postman.
* **delete by ID**: elimina un producto del array de productos según `id` especificado en url.

Las peticiones **add product** y **get all products** también pueden ser probados a través la siguiente url:
```
localhost:8080/static/index.html
```