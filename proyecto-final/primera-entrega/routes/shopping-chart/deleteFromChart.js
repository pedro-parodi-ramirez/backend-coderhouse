const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const shoppingChartController = require('../../config/shoppingChartController');

/* Eliminar producto de carrito */
router.delete('/api/carrito/:id/productos', async function (req, res, next) {
    try {
        let idChart = parseInt(req.params.id);
        let idProduct = parseInt(req.body.id);
        console.log(`\nSolicitud DELETE para eliminar idProducto:${idProduct} de idCarrito:${idChart}`);
        let accepted = await shoppingChartController.deleteFromChart(idChart, idProduct);

        if (accepted) {
            res.status(STATUS.ACCEPTED).end();
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