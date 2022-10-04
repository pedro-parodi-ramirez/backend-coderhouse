const express = require('express');
const router = express.Router();
const showProducts = require('./getProducts');
const addProduct = require('./addProduct');

router.use('/', showProducts, addProduct);

module.exports = router;