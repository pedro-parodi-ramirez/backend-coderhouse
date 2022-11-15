import { Router } from 'express';
import showProducts from './getProducts.js';
import addProduct from './addProduct.js';
import fakerView from './fakerView.js';
import { router as login } from './login.js';

const router = Router();

router.use('/', showProducts, addProduct, fakerView, login);

export default router;