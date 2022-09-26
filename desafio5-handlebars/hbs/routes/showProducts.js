const express = require('express');
const router = express.Router();
const DB = require('../config/DB.js');

// Lectura de archivo con productos
let products, nextID;
(async function () {
    products = await DB.getAll();
    nextID = DB.productQty + 1;
})(true)

/* GET products. */
router.get('/productos', function(req, res, next) {
  try{
    let isEmpty;
    (DB.productQty === 0) ? isEmpty = true : isEmpty = false;
    const data = {
      isEmpty,
      products
    };
    
    console.log('Solicitud de listar los productos');
    res.render('showProducts', data);
  }
  catch(e){
    console.log(e.message);
    next(e);
  }
});

module.exports = router;