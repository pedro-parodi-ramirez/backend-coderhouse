const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const shoppingChartController = require('../../config/shoppingChartController');

/* Eliminar producto de carrito */
router.delete('/api/carrito/:idChart/productos/:idProduct', async function (req, res, next) {
    try {
        let idChart = parseInt(req.params.idChart);
        let idProduct = parseInt(req.params.idProduct);
        console.log(`\nSolicitud DELETE para eliminar idProducto:${idProduct} de idCarrito:${idChart}`);
        const chartProducts = await shoppingChartController.deleteFromChart(idChart, idProduct);

        if (chartProducts !== null) {
            res.status(STATUS.ACCEPTED).json(chartProducts);
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