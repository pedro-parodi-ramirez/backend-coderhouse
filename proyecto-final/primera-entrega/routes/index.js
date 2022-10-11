const express = require('express');
const router = express.Router();
const showProducts = require('./products/getProducts');
const addProduct = require('./products/addProduct');
const updateProduct = require('./products/updateProduct');
const deleteProduct = require('./products/deleteProduct');
const createChart = require('./shopping-chart/createChart');
const deleteChart = require('./shopping-chart/deleteChart');
const addToChart = require('./shopping-chart/addToChart');
const getFromChart = require('./shopping-chart/getFromChart');
const deleteFromChart = require('./shopping-chart/deleteFromChart');

router.use('/', showProducts, addProduct, updateProduct, deleteProduct,
createChart, deleteChart, addToChart, getFromChart, deleteFromChart);

module.exports = router;