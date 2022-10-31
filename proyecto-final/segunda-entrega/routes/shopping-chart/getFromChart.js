import { Router } from 'express';
import { variables } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Buscar productos en carrito */
router.get('/api/carrito/:id/productos', async function (req, res) {
    try {
        let idChart = req.params.id;
        console.log(`\nSolicitud GET para mostrar productos en idCarrito:${idChart}`);
        let products = await chartAPI.getAllFromChart(idChart);
        
        (products.length >= 0) && console.log('🛒✔ Lectura de productos en carrito ✔🛒');
        res.status(STATUS.OK).json(products);
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(e.message);
    }
});

export default router;