# Desafío 13 - Cluster y Nginx
Pruebas de ejectuar servidor en modos cluster y modo fork. Uso de Nginx.

Del lado del front-end, la aplicación cuenta con una única ruta `localhost:8080` que permite interactuar con todas las funcionalidades. Para ello es necesario estar registrado y logueado en el servidor, donde la persistencia de usuarios  y productos se realiza haciendo uso de Mongo Atlas. La app también cuenta con un chat en línea con todos los usuarios conectados. Los mensajes hacen uso de archivos .json.

## Ejecutar servidor

### PM2
Modo cluster
```
pm2 start ./app.js -i max -- -p=8080
```
Modo fork
```
pm2 start ./app.js -- -p=8080 -m=fork
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
El repositorio cuenta con un archivo `nginx_config`. Este debe ser usado para configurar Nginx. Reemplazar el archivo `default` en el directorio de instalación de nginx `...\nginx\sites-available` por el archivo `nginx_config`. Se recomienda guardar un back-up del archivo `default` original.
Además, configurar en dicho archivo la ruta donde se encuentran los archivos públicos del repositorio:
```
listen 8080 default_server;
listen [::]:8080 default_server;
root [CONFIGURE_SU_RUTA_AQUI];
server_name _;
  ```
  Ejemplo:
  ```
root /home/pedro-parodi-ramirez/Coderhouse/Backend/Desafios/desafio13-cluster/public;
  ```