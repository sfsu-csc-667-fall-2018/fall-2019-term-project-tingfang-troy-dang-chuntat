var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    var {user} = req ;
    var username = user['username'];
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

module.exports = router;

