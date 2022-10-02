const express = require('express');
const router = express.Router();
const DB = require('../config/DB.js');

/* GET add product. */
router.get('/', function(req, res, next) {
  try{
    console.log('Solicitud GET para completar formulario addProduct');
    res.render('addProduct');
    console.log('[SUCCESS]');
  }
  catch(e){
    console.log(e.message);
    next(e);
  }
});

/* POST add product */
router.post('/productos', function(req, res, next) {
  try{
    console.log('Solicitud POST para agregar producto');
    DB.addProduct(req.body);
    console.log('[SUCCESS]');
    res.redirect('/api/productos');
  }
  catch(e){
    console.log(e.message);
    next(e);
  }
})

module.exports = router;