const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const shoppingChartController = require('../../config/shoppingChartController');

/* Crear nuevo carrito */
router.post('/api/carrito', async function (_, res, next) {
    try {
        console.log('\nSolicitud POST para crear nuevo carrito');
        let id = await shoppingChartController.createChart();
        res.status(STATUS.CREATED).json(JSON.stringify(id));
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;