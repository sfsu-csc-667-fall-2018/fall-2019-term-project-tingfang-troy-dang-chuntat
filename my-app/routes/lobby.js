var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("AAAAAA", req.isAuthenticated);
  if(req.isAuthenticated()){
  var {user} = req ;
  const username = user['username'];
  console.log(username)
  // const username = user['username'];
  res.render('lobby', {username : username});
  }
  else {
    res.redirect('login')
  }
});

module.exports = router;