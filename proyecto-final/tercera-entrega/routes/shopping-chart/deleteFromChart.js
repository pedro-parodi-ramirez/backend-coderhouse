import { Router } from 'express';
import { variables } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Delete product from cart */
router.delete('/api/carrito/:idChart/productos/:idProduct', async function (req, res) {
    try {
        let idChart = req.params.idChart;
        let idProduct = req.params.idProduct;
        console.log(`\nDELETE request to delete idProduct:${idProduct} from idCart:${idChart}`);
        const succeed = await chartAPI.deleteFromChart(idChart, idProduct);

        if (succeed) {
            console.log('🛒✔ Added product to cart ✔🛒');
            // Respond products from cart updated
            const products = await chartAPI.getAllFromChart(idChart);
            res.status(STATUS.ACCEPTED).json(products);
        }
        else {
            console.log('🛒❌ Cart or product not found ❌🛒');
            res.status(STATUS.BAD_REQUEST).end();
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.ACCEPTED).json(e.message);
    }
});

export default router;