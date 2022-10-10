const express = require('express');
const router = express.Router();
const showProducts = require('./getProducts');
const addProduct = require('./addProduct');
const shoppingChart = require('./shoppingChart');

router.use('/', showProducts, addProduct, shoppingChart);

module.exports = router;