import { Router } from 'express';
import showProducts from './products/getProducts.js';
import addProduct from './products/addProduct.js';
import updateProduct from './products/updateProduct.js';
import deleteProduct from './products/deleteProduct.js';
import createChart from './shopping-chart/createChart.js';
import deleteChart from './shopping-chart/deleteChart.js';
import addToChart from './shopping-chart/addToChart.js';
import getFromChart from './shopping-chart/getFromChart.js';
import deleteFromChart from './shopping-chart/deleteFromChart.js';

const router = Router();

router.use('/', showProducts, addProduct, updateProduct, deleteProduct,
createChart, deleteChart, addToChart, getFromChart, deleteFromChart);

export default router;