var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/:page', function(request, response) {
	const { page } = request.params;
	const rooms = [
		11, 22, 33, 44, 55, 66, 77, 88, 99, 1010, 1111, 1212, 1313, 1414, 1515
	];

  response.render('authenticated/lobby', { page , rooms});
});

module.exports = router;