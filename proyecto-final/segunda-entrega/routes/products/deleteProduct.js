import { Router } from 'express';
import { STATUS, ADMIN } from '../../config/variables.js';
import DB from '../../config/DB.js';

const router = Router();

/* Eliminar producto según ID */
router.delete('/api/productos/:id', async function (req, res, next) {
    try {
        if (ADMIN) {
            let id = parseInt(req.params.id);
            console.log(`\nSolicitud DELETE para eliminar producto id:${id}`);
            let accepted = await DB.deleteProduct(id);
            if (accepted) {
                res.status(STATUS.ACCEPTED).end();
            }
            else {
                let message = {
                    error: -2,
                    route: 'localhost:8080/api/productos/:id',
                    method: 'DELETE',
                    status: 'No implementado'
                }
                res.status(STATUS.NOT_FOUND).json(message);
            }
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
        next(e);
    }
});

export default router;