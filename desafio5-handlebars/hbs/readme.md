# Desafío 5 - Hanglebars
La aplicación cuenta con funcionalidades de listar productos y agregar productos, haciendo uso de handlebars. Al iniciar, se cuenta con un array `productos` con un total de 3 items.

## Configuración

1. El paquete nodemon debe instalarse de forma global. Caso contrario, modificar la ruta según corresponda para el comando `npm run dev` dentro del archivo `package.json`:
```
"script":{
    "dev": "nodemon --exec 'node -r dotenv/config' ./index.js"
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
localhost:3000/static/index.html
```
## Rutas disponibles

***1) localhost:3000/static/index.html***

Acceso a sitio principal, cuenta con dos botones `Mostrar productos` y `Agregar producto`

***2) localhost:3000/api/productos***

Lista con todos los productos. Cuenta también con el botón `Agregar producto`

***3) localhost:3000/api***

Formulario para agregar un producto. Al agregarlo mediante el botón `enviar`, redirige a ruta del punto ***2)***