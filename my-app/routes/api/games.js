 
 var express = require('express');
 var router = express.Router();
 var path = require('path');
 var db = require('../../db');
 /* GET home page. */
 router.get('/:id', function(request, response) {
 	const { id } = request.params;
console.log(id)
     // response.render('games', { id });
     response.render('games', {id:id})
 });
 
 
 
 
 module.exports = router;