var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');

});

router.post('/', function(req, res, next) {
  res.render('lobby');

});

module.exports = router;