import { Router } from 'express';
import { variables } from '../../config/config.js';
import { cartDAO as cartAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Delete product from cart */
router.delete('/api/carrito/:idCart/productos/:idProduct', async function (req, res) {
    try {
        let idCart = req.params.idCart;
        let idProduct = req.params.idProduct;
        console.log(`\nDELETE request for idProduct:${idProduct} from idCart:${idCart}`);
        const succeed = await cartAPI.deleteFromCart(idCart, idProduct);

        if (succeed) {
            console.log('🛒✔ Product deleted from cart ✔🛒');
            // Respond products from cart updated
            const products = await cartAPI.getAllFromCart(idCart);
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