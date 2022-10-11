const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const shoppingChartController = require('../../config/shoppingChartController');

/* Buscar productos en carrito */
router.get('/api/carrito/:id/productos', async function (req, res, next) {
    try {
        let idChart = parseInt(req.params.id);
        console.log(`\nSolicitud GET para mostrar productos en idCarrito:${idChart}`);
        let products = await shoppingChartController.getFromChart(idChart);

        if (products !== null) {
            res.status(STATUS.ACCEPTED).json(products);
        }
        else {
            res.status(STATUS.BAD_REQUEST).end();
        }
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;