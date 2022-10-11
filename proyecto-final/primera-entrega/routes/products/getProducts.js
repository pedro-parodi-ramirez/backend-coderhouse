const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const DB = require('../../config/DB');

/* Obtener todos los productos. */
router.get('/api/productos', async function (_, res, next) {
  try {
    console.log('\nSolicitud GET de listar los productos');
    const products = await DB.getAllProducts();

    res.status(STATUS.OK).json(products);
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

/* Obtener producto según ID */
router.get('/api/productos/:id', async function (req, res, next) {
  try {
    let id = parseInt(req.params.id);
    console.log(`\nSolicitud GET de mostrar producto id:${id}`);
    const productRequested = await DB.getProductById(id);
    if (productRequested !== null) {
      res.status(STATUS.OK).json(productRequested);
    }
    else {
      res.status(STATUS.BAD_REQUEST).end();
    }
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;