import { Router } from 'express';
import { STATUS } from '../../config/variables.js';
import { shoppingChartController } from '../../config/shoppingChartController.js';

const router = Router();

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
            let message = {
                error: -2,
                route: 'localhost:8080/api/carrito/:idChart/productos/:idProduct',
                method: 'DELETE',
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

export default router;