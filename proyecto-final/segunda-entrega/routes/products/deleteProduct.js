import { Router } from 'express';
import { STATUS, ADMIN } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();

/* Eliminar producto según ID */
router.delete('/api/productos/:id', async function (req, res, next) {
    try {
        if (ADMIN) {
            let id = req.params.id;
            console.log(`\nSolicitud DELETE para eliminar producto id:${id}`);
            let accepted = await productAPI.deleteById(id);
            if (accepted) { res.status(STATUS.ACCEPTED).end(); }
            else { res.status(STATUS.BAD_REQUEST).end(); }
        }
        else {
            let message = {
                error: -1,
                route: 'localhost:8080/api/productos/:id',
                method: 'DELETE',
                status: 'No autorizado'
            }
            res.status(STATUS.UNAUTHORIZED).json(message);
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(e.message);
    }
});

export default router;