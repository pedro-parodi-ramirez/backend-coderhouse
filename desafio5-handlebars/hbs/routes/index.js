const express = require('express');
const router = express.Router();
const showProducts = require('./showProducts');
const addProduct = require('./addProduct');

router.use('/api', showProducts, addProduct);

module.exports = router;