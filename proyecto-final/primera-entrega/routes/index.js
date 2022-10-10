const express = require('express');
const router = express.Router();
const showProducts = require('./getProducts');
const addProduct = require('./addProduct');
const updateProduct = require('./updateProduct');
const deleteProduct = require('./deleteProduct');
const shoppingChart = require('./shoppingChart');

router.use('/', showProducts, addProduct, updateProduct, deleteProduct, shoppingChart);

module.exports = router;