const express = require('express');
const app = express();
const path = require('path');
const products = require('./routers/products');
const STATUS = require('./config/variables.js');
const PORT = process.env.NODE_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/api', products);

// Error en la API
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(STATUS.INTERNAL_SERVER_ERROR).send('Algo salió mal!');
})

// Se inicia servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));