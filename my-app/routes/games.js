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
  .then( __ => db.any(`SELECT * FROM "games" WHERE creator=$1`, [username])
  .then ( result => {
	

	var id = result[result.length -1].id
	  res.redirect('/api/games/' + id) } ))
  .catch (
	  error => {console.log(error)}

  )
	}

})

router.get('/:id/quit', function(request, response) {
	if( request.isAuthenticated()) {
	var { id } = request.params;
	console.log(id)
	var {user} = request
	username = user['username']
	db.any(`DELETE  FROM "user-room" WHERE username = '${username}' AND "roomID" = '${id}'`)
	.then ( () => { 
		db.any(`SELECT COUNT(*)  FROM "user-room" WHERE "roomID" = '${id}' `)
		.then ( result => {
			console.log ("print count when quit")
			console.log(result);
			console.log(result[0].count);
			var count = result[0].count.toString()
			console.log(count);

			if ( count == "0")  {
			console.log("deleting a room")
			db.any(`DELETE  FROM games WHERE  id = '${id}'`)
			.then (response.redirect('/lobby'))
			}
			else {
				response.redirect('/lobby')
			}

		})

	})

	} 
	else 
	response.json("something wrong with quit authentication")
});


module.exports = router;