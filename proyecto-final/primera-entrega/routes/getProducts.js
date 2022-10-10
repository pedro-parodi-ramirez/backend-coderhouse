const express = require('express');
const router = express.Router();
const STATUS = require('../config/variables');
const DB = require('../config/DB');

/* GET all products. */
router.get('/api/productos', async function (_, res, next) {
  try {
    console.log('Solicitud GET de listar los productos');
    let isEmpty;
    const products = await DB.getAllProducts();
    (DB.productQty === 0) ? isEmpty = true : isEmpty = false;
    const data = {
      isEmpty,
      products
    };

    res.status(STATUS.OK).json(data);
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get('/api/productos/:id', async function (req, res, next) {
  try {
    let id = parseInt(req.params.id);
    console.log(`Solicitud GET de mostrar product id:${id}`);
    const productRequested = await DB.getProductById(id);
    if (productRequested !== null) {
      res.status(STATUS.OK).json(productRequested);
    }
    else {
      res.status(STATUS.BAD_REQUEST).json(productRequested);
    }
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;