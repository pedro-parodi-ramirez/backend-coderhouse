import { Router } from 'express';
import { variables } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Add product to cart */
router.post('/api/carrito/:id/productos', async function (req, res) {
    try {
        let idChart = req.params.id;
        let product = req.body;
        console.log(`\nPOST request to add product idProduct:${product._id} to idCart:${idChart}`);
        const succeed = await chartAPI.addToChart(idChart, product);

        if (succeed) {
            console.log('🛒✔ Added product to cart ✔🛒');

            // Respond products from cart updated
            const products = await chartAPI.getAllFromChart(idChart);
            res.status(STATUS.ACCEPTED).json(products);
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