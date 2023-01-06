import { Router } from 'express';
import { variables } from '../../config/config.js';
import { cartDAO as cartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Add product to cart */
router.post('/:id/productos', async function (req, res) {
    try {
        let idCart = req.params.id;
        let product = req.body;
        console.log(`\nPOST request to add product idProduct:${product._id} to idCart:${idCart}`);
        const succeed = await cartAPI.addToCart(idCart, product);

        if (succeed) {
            console.log('🛒✔ Product added to cart ✔🛒');

            // Respond products from cart updated
            const products = await cartAPI.getAllFromCart(idCart);
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