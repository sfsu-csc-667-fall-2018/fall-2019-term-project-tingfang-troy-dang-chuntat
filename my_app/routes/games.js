var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/:id', function(request, response) {
	const { id } = request.params;

	response.render('authenticated/games', { id });
});

module.exports = router;