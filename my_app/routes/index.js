var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('unauthenticated/index', { title: 'Texas Hold em' });
});

router.get('/users/login', (_, response) => {
	response.render('unauthenticated/login');
})

router.get('/users/signup', (_, response) => {
	response.render('unauthenticated/signup');
})

module.exports = router;