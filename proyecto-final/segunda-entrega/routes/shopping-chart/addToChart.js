import { Router } from 'express';
import { STATUS } from '../../config/variables.js';
import { shoppingChartController } from '../../config/shoppingChartController.js';

const router = Router();

/* Agregar producto a carrito */
router.post('/api/carrito/:id/productos', async function (req, res, next) {
    try {
        let idChart = parseInt(req.params.id);
        let idProduct = parseInt(req.body.id);
        console.log(`\nSolicitud POST para agregar idProducto:${idProduct} a idCarrito:${idChart}`);
        let chartProducts = await shoppingChartController.addToChart(idChart, idProduct);

        if (chartProducts !== null) {
            // La respuesta son los productos del carrito
            res.status(STATUS.ACCEPTED).json(chartProducts);
        }
        else {
            let message = {
                error: -2,
                route: 'localhost:8080/api/carrito/:id/productos',
                method: 'POST',
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