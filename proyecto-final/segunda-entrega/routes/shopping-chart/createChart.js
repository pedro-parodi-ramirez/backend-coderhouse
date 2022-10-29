import { Router } from 'express';
import { STATUS } from '../../config/config.js';
import { shoppingChartController } from '../../containers/shoppingChartController.js';

const router = Router();

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

export default router;