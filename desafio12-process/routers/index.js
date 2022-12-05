import { Router } from 'express';
import showProducts from './getProducts.js';
import addProduct from './addProduct.js';
import auth from './auth.js';
import users from './users.js';
import info from './info.js'

const router = Router();

router.use('/', showProducts, addProduct, info);
router.use('/auth', auth);
router.use('/users', users);

export default router;