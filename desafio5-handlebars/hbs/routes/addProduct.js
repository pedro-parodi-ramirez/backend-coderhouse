const express = require('express');
const router = express.Router();

/* GET add product. */
router.get('/', function(req, res, next) {
  try{
    console.log('Solicitud para completar formulario addProduct');
    res.render('addProduct');
  }
  catch(e){
    console.log(e.message);
    next(e);
  }
});

module.exports = router;