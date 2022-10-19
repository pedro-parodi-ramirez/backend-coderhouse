const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV;
const index = require('./routes/index');
const { initSocket } = require('./socket');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', index);
app.use(express.static(path.join(__dirname, '/public')));

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
});

initSocket(server);

server.on("error", error => console.log(`Error en servidor ${error}`));