import { Router } from 'express';
import { STATUS } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();

/* Agregar producto a carrito */
router.post('/api/carrito/:id/productos', async function (req, res) {
    try {
        let idChart = req.params.id;
        let product = req.body;
        console.log(`\nSolicitud POST para agregar idProducto:${product._id} a idCarrito:${idChart}`);
        const succeed = await chartAPI.addToChart(idChart, product);

        if (succeed) {
            console.log('🛒✔ Producto agregado a carrito ✔🛒');

            // Se retornan los productos del carrito actualizado
            const products = await chartAPI.getAllFromChart(idChart);
            res.status(STATUS.ACCEPTED).json(products);
        }
        else {
            console.log('🛒❌ Carrito no encontrado ❌🛒');
            res.status(STATUS.BAD_REQUEST).end();
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(e.message);
    }
});

export default router;