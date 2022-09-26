const express = require('express');
const { Router } = express;
const router = Router();
const STATUS = require('../config/variables.js');

// Productos
const DB = require('./DB.js');
const container = new DB();

let products, nextID;
(async function () {
    products = await container.getAll();
    nextID = DB.productQty + 1;
})(true)

/* Peticiones al servidor */
// GET
router.get('/productos', (_, res) => {
    res.status(STATUS.OK).json(products);
});

router.get('/productos/:id', (req, res) => {
    // Se capta el id como parametro de la url
    let id = parseInt(req.params.id);

    // Busqueda y retorno del producto segun id
    const queryProduct = products.find((p) => p.id === id);
    if (queryProduct === undefined) {
        res.status(STATUS.BAD_REQUEST).json({ error: 'producto no encontrado.' });
    }
    else {
        res.status(STATUS.OK).json(queryProduct);
    }
})

// POST
router.post('/productos', (req, res) => {
    let { body: data } = req;
    let newProduct = { id: nextID, ...data };
    products.push(newProduct);
    nextID++;
    res.status(STATUS.CREATED).json(newProduct);
})

// PUT
router.put('/productos/:id', (req, res) => {
    // Se capta el id como parametro de la url
    let id = parseInt(req.params.id);

    // Check id existente y se guarda nuevo objeto si corresponde
    if (products.some(p => p.id === id)) {
        let { body: data } = req;
        let newProduct = { id, ...data };
        products[id - 1] = newProduct;
        res.status(STATUS.ACCEPTED).json(newProduct);
    }
    else {
        res.status(STATUS.BAD_REQUEST).json({ error: 'producto no encontrado.' });
    }
})

// DELETE
router.delete('/productos/:id', (req, res) => {
    // Se capta el id como parametro de la url
    let id = parseInt(req.params.id);

    // Check id existente y se elimina nuevo objeto si corresponde
    if (products.some(p => p.id === id)) {
        products = products.filter((p) => p.id !== id);
        res.status(STATUS.ACCEPTED).json(`Producto con ID=${id} eliminado.`);
    }
    else {
        res.status(STATUS.BAD_REQUEST).json({ error: 'producto no encontrado.' });
    }
})

module.exports = router;