const express = require('express');
const router = express.Router();
const DB = require('../db/db.js');

/* GET products. */
router.get('/api/productos', async function(_, res, next) {
  try{
    console.log('Solicitud GET de listar los productos');
    const data = await DB.getProducts();
        
    res.json(data);
    console.log('[SUCCESS]');
  }
  catch(e){
    console.log(e.message);
    next(e);
  }
});

module.exports = router;