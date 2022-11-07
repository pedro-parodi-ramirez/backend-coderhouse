import { Router } from 'express';
import showProducts from './getProducts.js';
import addProduct from './addProduct.js';

const router = Router();


router.use('/', showProducts, addProduct);

export default router;