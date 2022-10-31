import { Router } from 'express';
import { STATUS } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();

/* Eliminar producto de carrito */
router.delete('/api/carrito/:idChart/productos/:idProduct', async function (req, res) {
    try {
        let idChart = req.params.idChart;
        let idProduct = req.params.idProduct;
        console.log(`\nSolicitud DELETE para eliminar idProducto:${idProduct} de idCarrito:${idChart}`);
        const succeed = await chartAPI.deleteFromChart(idChart, idProduct);

        if (succeed) {
            // Se retornan los productos del carrito actualizado
            const products = await chartAPI.getAllFromChart(idChart);
            res.status(STATUS.ACCEPTED).json(products);
        }
        else {
            console.log('🛒❌ Carrito o producto no encontrado ❌🛒');
            res.status(STATUS.BAD_REQUEST).end();
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.ACCEPTED).json(e.message);
    }
});

export default router;