const express = require('express');
const router = express.Router();
const { STATUS } = require('../config/variables');
const { ADMIN } = require('../config/variables');
const DB = require('../config/DB');

/* Agregar nuevo producto */
router.post('/api/productos', async function (req, res, next) {
  try {
    if (ADMIN) {
      console.log('\nSolicitud POST para agregar producto');
      await DB.addProduct(req.body);
      res.status(STATUS.ACCEPTED).redirect('/');
    }
    else {
      let message = {
        error: -1,
        route: 'localhost:8080/api/productos',
        method: 'POST',
        status: 'No autorizado'
      }
      res.status(STATUS.UNAUTHORIZED).json(message);
    }
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
})

module.exports = router;