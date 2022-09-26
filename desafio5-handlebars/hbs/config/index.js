var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Acceso a sitio principal del sitio web');
  res.render('main', { title: 'Express' });
});

module.exports = router;