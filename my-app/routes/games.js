var express = require('express');
var router = express.Router();
var path = require('path');
var createGame = require('./lobby');
var db = require('../db');
var username = createGame.username;
console.log(username)
/* GET home page. */
// router.get('/:id', function(request, response) {
// 	const { id } = request.params;

// 	response.render('games', { id });
// });

router.get('/create', function(req,res, next) {
	if( req.isAuthenticated()) {
		var {user} = req 
		username = user['username']
			// username = req.body.username;
		// db.any(`INSERT INTO "games" ("creator") VALUES ('${username}')`)
// db.any(`DELETE  FROM games WHERE creator = '${username}'`)
	db.any(`INSERT INTO games ("creator") VALUES ('${username}')`)
  .then( db.any(`SELECT * FROM "games" WHERE creator=$1`, [username])
  .then ( result => {

	var id = result[result.length -1].id
	  console.log("AAAA", id)
	  res.redirect('/api/games/' + id) } ))
  .catch (
	  error => {console.log(error)}

  )
	}

})

router.get('/quit', function(request, response) {
	var {user} = request
	username = user['username']
	db.any(`DELETE  FROM games WHERE creator = '${username}'`)
	.then (response.redirect('/lobby'))
});


module.exports = router;