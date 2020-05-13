var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db');
/* GET home page. */

var username
var pass  = "foo"
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    var {user} = req ;
    username = user['username'];
        // username = req.body.username;

    db.any(`SELECT * FROM games `)
      .then ( result => {
        console.log(result)
        res.render('lobby', {username : username, rooms:result})
      })
    .catch (
      
    )
  }
  else {
    res.redirect('login')
  }
});

// router.get('/api/games/create', function(req,res, next) {

//   db.any(`INSERT INTO games ("creator") VALUES ('${username}')`)
//   .then( _ => db.any(`SELECT * FROM games WHERE creator = ${username}`) 
//   .then ( console.log(db))
//   )})
module.exports = router;


exports.username = username;
exports.pass = pass;