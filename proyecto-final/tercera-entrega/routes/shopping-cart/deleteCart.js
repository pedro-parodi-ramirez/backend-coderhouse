import { Router } from 'express';
import { variables } from '../../config/config.js';
import { cartDAO as cartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Delete cart based on ID */
router.delete('/api/carrito/:id', async function (req, res) {
    try {
        let id = req.params.id;
        console.log(`\nDELETE request for cart id:${id}`);
        let succeed = await cartAPI.deleteById(id);

        if (succeed > 0) {
            console.log('🛒✔ Cart deleted ✔🛒');
            res.status(STATUS.ACCEPTED).end();
        }
        else {
            console.log('🛒❌ Cart not found ❌🛒');
            res.status(STATUS.BAD_REQUEST).end();
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(e.message);
    }
});

export default router;