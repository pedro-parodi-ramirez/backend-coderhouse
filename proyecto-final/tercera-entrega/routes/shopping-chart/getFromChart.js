import { Router } from 'express';
import { variables } from '../../config/config.js';
import { chartDAO as chartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Search for product on cart */
router.get('/api/carrito/:id/productos', async function (req, res) {
    try {
        let idChart = req.params.id;
        console.log(`\nGET request to show products from idCart:${idChart}`);
        let chartProducts = await chartAPI.getAllFromChart(idChart);

        (chartProducts.length >= 0) && console.log('🛒✔ Read products from cart ✔🛒');
        res.status(STATUS.OK).json(chartProducts);
    }
    catch (e) {
        console.log(e.message);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
    }
});

export default router;