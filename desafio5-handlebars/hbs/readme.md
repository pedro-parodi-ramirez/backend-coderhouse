# Desafío 5 - Handlebars
La aplicación cuenta con funcionalidades de listar productos y agregar productos, haciendo uso de `handlebars` para plantillas. Al iniciar, se cuenta con un array `productos` con un total de 3 items. Se utilizó `handlebars` como motor de plantillas dado que parece ser un punto medio, en cuanto a complejidad, entre `PUG` y `EJS`.

El motor `PUG` posee una sintaxis basada en tabulaciones para abrir y cerrar etiquetas, se cree esto que puede generar errores con más frecuencia (por su simplicidad), por lo que se decidió evitar.

El motor EJS parece ser el más completo de todos. Se deja para una etapa futura su implementación y así definir el mejor motor entre `handlebars` y `EJS`.


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
localhost:3000/static/index.html
```
## Rutas disponibles

***1) localhost:3000/static/index.html***

Acceso a sitio principal, cuenta con dos botones `Mostrar productos` y `Agregar producto`.

***2) localhost:3000/api/productos***

Lista con todos los productos. Cuenta también con el botón `Agregar producto`.

***3) localhost:3000/api***

Formulario para agregar un producto. Al agregarlo mediante el botón `enviar`, redirige a ruta del punto ***2)***. Se cuenta también con un botón `Listar productos`.