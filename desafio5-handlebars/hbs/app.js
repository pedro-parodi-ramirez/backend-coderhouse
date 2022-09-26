const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const PORT = process.env.PORT;
const ENV = process.env.ENV;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
const main = require('./config/index');
const products = require('./config/products');
app.use('/', main);
app.use('/', products);

/* Handlebars */
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/* Server */
const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));