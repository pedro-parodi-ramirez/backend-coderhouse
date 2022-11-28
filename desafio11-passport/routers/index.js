import { Router } from 'express';
import showProducts from './getProducts.js';
import addProduct from './addProduct.js';
import auth from './auth.js';
import users from './users.js';

const router = Router();

router.use('/', showProducts, addProduct);
router.use('/auth', auth);
router.use('/users', users);

export default router;