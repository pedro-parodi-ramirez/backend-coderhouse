import { Router } from 'express';
import showProducts from './products/getProducts.js';
import addProduct from './products/addProduct.js';
import updateProduct from './products/updateProduct.js';
import deleteProduct from './products/deleteProduct.js';
import createCart from './shopping-Cart/createCart.js';
import deleteCart from './shopping-Cart/deleteCart.js';
import addToCart from './shopping-Cart/addToCart.js';
import getFromCart from './shopping-Cart/getFromCart.js';
import deleteFromCart from './shopping-Cart/deleteFromCart.js';

const router = Router();

router.use('/', showProducts, addProduct, updateProduct, deleteProduct,
createCart, deleteCart, addToCart, getFromCart, deleteFromCart);

export default router;