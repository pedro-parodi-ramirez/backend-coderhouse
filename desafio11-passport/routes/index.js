import { Router } from 'express';
import showProducts from './main/getProducts.js';
import addProduct from './main/addProduct.js';
import fakerView from './main/fakerView.js';
import { router as login } from './session/login.js';
import logout from './session/logout.js';

const router = Router();

router.use('/', showProducts, addProduct, fakerView, login, logout);

export default router;