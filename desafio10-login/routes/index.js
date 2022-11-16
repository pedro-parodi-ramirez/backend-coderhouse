import { Router } from 'express';
import showProducts from './main/getProducts.js';
import addProduct from './main/addProduct.js';
import fakerView from './main/fakerView.js';
import { router as session } from './session/login.js';

const router = Router();

router.use('/', showProducts, addProduct, fakerView, session);

export default router;