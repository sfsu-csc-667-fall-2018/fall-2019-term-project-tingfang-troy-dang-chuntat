var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db');
const { USER_JOINED, MESSAGE_SEND } = require('../src/constants/events')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    var {user} = req ;
    var username = user['username'];


    db.any(`SELECT * FROM games `)
      .then ( result => {
        res.render('lobby', {username : username, rooms:result})

      })
    .catch (
      
    )
  }
  else {
    res.redirect('login')
  }
});

router.post('/message', function(req, res, next) {
  if(req.isAuthenticated()){
   console.log(req.body.message)
  }
});

module.exports = router;

