const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  console.log('Acceso a sitio principal del sitio web');
  res.render('index');
});

module.exports = router;