const express = require('express');
const router = express.Router();
const STATUS = require('../config/variables');
const shoppingChartController = require('../config/shoppingChartController');

/* Crear carrito */
router.post('/api/carrito', async function (_, res, next) {
    try {
        console.log('Solicitud de crear nuevo carrito de compras');
        let id = await shoppingChartController.newShoppingChart();
        res.status(STATUS.CREATED).json(JSON.stringify(id));
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;