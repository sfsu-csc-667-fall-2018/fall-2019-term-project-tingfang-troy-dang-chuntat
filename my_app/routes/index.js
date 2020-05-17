var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(request, response) {
  	response.render('unauthenticated/login');
});

router.get('/users/login', (_, response) => {
	response.render('unauthenticated/login');
})

router.get('/users/signup', (_, response) => {
	response.render('unauthenticated/signup');
})

module.exports = router;