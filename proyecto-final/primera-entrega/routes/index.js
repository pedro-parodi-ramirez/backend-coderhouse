const express = require('express');
const router = express.Router();
const showProducts = require('./products/getProducts');
const addProduct = require('./products/addProduct');
const updateProduct = require('./products/updateProduct');
const deleteProduct = require('./products/deleteProduct');
const addChart = require('./shopping-chart/addChart');
const deleteChart = require('./shopping-chart/deleteChart');

router.use('/', showProducts, addProduct, updateProduct, deleteProduct,
                addChart, deleteChart);

module.exports = router;