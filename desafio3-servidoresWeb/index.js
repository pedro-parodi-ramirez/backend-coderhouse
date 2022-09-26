const Container = require('./docs/Container');
const contanier = new Container();
const PORT = 8080;
const express = require('express');
const app = express();

// Se lee archivo json con productos que actualiza la cantidad de productos en stock
(async function(){
    await contanier.getAll();
})();

// Se crea el servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));

// Atención a peticiones del servidor
app.get('/productos', (req, resp) => {
    // Obteción de productos desde archivo json
    (async function(){
        const products = await contanier.getAll();
        resp.send(products);
    })();
})

app.get('/productoRandom', (req, resp) => {
    // Generación de id de producto aleatorio
    const randomId = Math.floor(Math.random() * Container.productQty);

    // Obteción de producto random desde archivo json
    (async function(){
        const randomProduct = await contanier.getById(randomId);
        resp.send(randomProduct);
    })();
});