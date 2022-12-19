# Desafío 13 - Cluster y Nginx
Pruebas de ejectuar servidor en modos cluster y modo fork. Uso de Nginx.

Del lado del front-end, la aplicación cuenta con una única ruta `localhost:80` que permite interactuar con todas las funcionalidades. Para ello es necesario estar registrado y logueado en el servidor, donde la persistencia de usuarios se realiza haciendo uso de Mongo Atlas, como así también la de productos. La app también cuenta con un chat en línea con todos los usuarios conectados. Los mensajes hacen uso de archivos .json.

## Ejecutar servidor

### PM2
Situado en la raiz del proyecto, ejectuar los siguientes comandos:
```
pm2 start app.js --name="instance-main-8080" -- -p=8080
pm2 start app.js --name="instance-api-randoms-8082" -- -p=8082
pm2 start app.js --name="instance-api-randoms-8083" -- -p=8083
pm2 start app.js --name="instance-api-randoms-8084" -- -p=8084
pm2 start app.js --name="instance-api-randoms-8085" -- -p=8085
```
### NINGX
Desde la terminal de Ubuntu, ejecutar con permisos de administrador:
```
sudo service nginx start
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

### NGINX
El repositorio cuenta con un archivo `nginx.conf`. Este debe ser usado para configurar Nginx. Reemplazar el archivo `nginx.conf` en el directorio de instalación de nginx por el archivo `nginx.conf` provisto en el repositorio. Se recomienda guardar un back-up del archivo de configuración original.