const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const { STATUS } = require('./config/variables');
const index = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', index);
app.use(express.static(path.join(__dirname, '/public')));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  let message = {
    error: -2,
    status: 'Ruta no implementada'
  }
  res.status(STATUS.NOT_FOUND).json(message);
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));