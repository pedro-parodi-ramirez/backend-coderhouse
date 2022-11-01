import { Router } from 'express';
import { variables } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Eliminar carrito según ID */
router.delete('/api/carrito/:id', async function (req, res) {
    try {
        let id = req.params.id;
        console.log(`\nSolicitud DELETE eliminar carrito id:${id}`);
        let succeed = await chartAPI.deleteById(id);

        if (succeed > 0) {
            console.log('🛒✔ Carrito eliminado ✔🛒');
            res.status(STATUS.ACCEPTED).end();
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