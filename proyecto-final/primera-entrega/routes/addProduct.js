const express = require('express');
const router = express.Router();
const STATUS = require('../config/variables');
const DB = require('../config/DB');

/* Agregar nuevo producto */
router.post('/api/productos', async function (req, res, next) {
  try {
    console.log('Solicitud POST para agregar producto');
    const data = req.body;
    await DB.addProduct(req.body);
    res.status(STATUS.ACCEPTED).redirect('/');
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
})

module.exports = router;