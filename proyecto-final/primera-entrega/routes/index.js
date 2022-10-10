const express = require('express');
const router = express.Router();
const showProducts = require('./products/getProducts');
const addProduct = require('./products/addProduct');
const updateProduct = require('./products/updateProduct');
const deleteProduct = require('./products/deleteProduct');
const newChart = require('./shopping-chart/newChart');
const deleteChart = require('./shopping-chart/deleteChart');
const addToChart = require('./shopping-chart/addToChart');
const deleteFromChart = require('./shopping-chart/deleteFromChart');

router.use('/', showProducts, addProduct, updateProduct, deleteProduct,
                newChart, deleteChart, addToChart, deleteFromChart);

module.exports = router;