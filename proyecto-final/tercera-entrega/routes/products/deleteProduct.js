import { Router } from 'express';
import { variables } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;
const ADMIN = variables.ADMIN;

/* Delete product based on ID */
router.delete('/api/productos/:id', async function (req, res) {
    try {
        if (ADMIN) {
            let id = req.params.id;
            console.log(`\nDELETE request for product id:${id}`);
            let succeed = await productAPI.deleteById(id);
            
            if (succeed > 0) {
                console.log('📁✔ Product deleted ✔📁');
                res.status(STATUS.ACCEPTED).end();
            }
            else {
                console.log('📁❌ Product not found ❌📁');
                res.status(STATUS.BAD_REQUEST).end();
            }
        }
        else {
            let message = {
                error: -1,
                route: 'localhost:8080/api/productos/:id',
                method: 'DELETE',
                status: 'Uauthorized'
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