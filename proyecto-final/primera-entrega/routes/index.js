const express = require('express');
const router = express.Router();
const showProducts = require('./getProducts');
const addProduct = require('./addProduct');
const updateProduct = require('./updateProduct');
const shoppingChart = require('./shoppingChart');

router.use('/', showProducts, addProduct, updateProduct, shoppingChart);

module.exports = router;