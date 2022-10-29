import { Router } from 'express';
import { STATUS, ADMIN } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();

/* Actualizar producto según ID */
router.put('/api/productos/:id', async function (req, res, next) {
    try {
        if (ADMIN) {
            let id = req.params.id;
            console.log(`\nSolicitud UPDATE para modificar producto id:${id}`);
            let accepted = await productAPI.update(id, req.body);
            if (accepted) { res.status(STATUS.ACCEPTED).end(); }
            else {
                console.log('📁❌ Producto no encontrado ❌📁');
                res.status(STATUS.BAD_REQUESTD).end();
            }
        }
        else {
            let message = {
                error: -1,
                route: 'localhost:8080/api/productos/:id',
                method: 'PUT',
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