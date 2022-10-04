const express = require('express');
const router = express.Router();
const DB = require('../config/DB.js');

/* GET products. */
router.get('/api/productos', function(req, res, next) {
  try{
    console.log('Solicitud GET de listar los productos');
    let isEmpty;
    let products = DB.getAllProducts();
    (DB.productQty === 0) ? isEmpty = true : isEmpty = false;
    const data = {
      isEmpty,
      products
    };
    
    res.json(data);
    console.log('[SUCCESS]');
  }
  catch(e){
    console.log(e.message);
    next(e);
  }
});

module.exports = router;