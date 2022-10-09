const express = require('express');
const router = express.Router();
const DB = require('../config/DB.js');
const { emit } = require('../socket');

/* POST add product */
router.post('/api/productos', async function (req, res, next) {
  try {
    const data = req.body;
    console.log('Solicitud POST para agregar producto');
    await DB.addProduct(req.body);
    emit('new-product', data);
    res.redirect('/');
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
})

module.exports = router;