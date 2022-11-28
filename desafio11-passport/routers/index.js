import { Router } from 'express';
import showProducts from './main/getProducts.js';
import addProduct from './main/addProduct.js';
import fakerView from './main/fakerView.js';
import auth from './session/auth.js';
import users from './session/users.js';

const router = Router();

router.use('/', showProducts, addProduct, fakerView);
router.use('/auth', auth);
router.use('/users', users);

export default router;