import { Router } from 'express';
import { STATUS } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();

/* Crear nuevo carrito */
router.post('/api/carrito', async function (_, res) {
    try {
        console.log('\nSolicitud POST para crear nuevo carrito');
        let id = await chartAPI.add();
        console.log('🛒 Carrito de compras creado 🛒');
        res.status(STATUS.CREATED).json(id);
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.INTERNAL_SERVER_ERROR).end();
    }
});

export default router;