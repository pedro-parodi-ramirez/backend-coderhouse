import { Router } from 'express';
import { variables } from '../../config/config.js';
import { cartDAO as cartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Create new cart */
router.post('/api/carrito', async function (_, res) {
    try {
        console.log('\nPOST request to create new cart');
        let id = await cartAPI.create({
            timestamp: Date.now(),
            products: []
        });
        console.log('🛒 New cart created 🛒');
        res.status(STATUS.CREATED).json(id);
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.INTERNAL_SERVER_ERROR).end();
    }
});

export default router;