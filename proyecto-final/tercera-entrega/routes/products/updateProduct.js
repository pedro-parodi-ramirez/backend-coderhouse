import { Router } from 'express';
import { variables } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;
const ADMIN = variables.ADMIN;

/* Update product based on ID */
router.put('/api/productos/:id', async function (req, res) {
    try {
        if (ADMIN) {
            let id = req.params.id;
            console.log(`\nUPDATE request to update product id:${id}`);

            let newPrice = parseFloat(parseFloat(req.body.price).toFixed(2));
            let newStock = parseInt(req.body.stock);
            const data = {
                timestamp: Date.now(),
                name: req.body.name,
                description: req.body.description,
                code: req.body.code,
                image: req.body.image,
                price: newPrice,
                stock: newStock,
            };

            let response = await productAPI.update(id, data);
            if (response > 0) {
                console.log('📁✔ Product updated on DB ✔📁');
                res.status(STATUS.ACCEPTED).end();
            }
            else {
                console.log('📁❌ Producto not found ❌📁');
                res.status(STATUS.BAD_REQUEST).end();
            }
        }
        else {
            let message = {
                error: -1,
                route: 'localhost:8080/api/productos/:id',
                method: 'PUT',
                status: 'Unathorized'
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