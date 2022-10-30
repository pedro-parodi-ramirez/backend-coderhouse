import { Router } from 'express';
import { STATUS } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();

/* Eliminar carrito según ID */
router.delete('/api/carrito/:id', async function (req, res) {
    try {
        let id = req.params.id;
        console.log(`\nSolicitud DELETE eliminar carrito id:${id}`);
        let response = await chartAPI.deleteById(id);

        if (response.deletedCount > 0) {
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