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
            let message = {
                error: -2,
                route: 'localhost:8080/api/carrito/:id/productos',
                method: 'GET',
                status: 'No implementado'
            }
            res.status(STATUS.NOT_FOUND).json(message);
        }
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;