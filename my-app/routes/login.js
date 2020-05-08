var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var bcrypt = require('bcrypt');

/* GET home page. */


router.get('/',  (req, res, next) => {
  if (req.isAuthenticated()) {
  res.redirect('lobby');
  }
  else{ 
    res.render('login')
   }
  

}
  );




// router.post("/", passport.authenticate('local'), (req,res)=> {
//   var {user} = req ;
//   const username = user['username'];
//   // res.redirect('lobby');
//   res.redirect('lobby');
// })

router.post('/', passport.authenticate('local', {
  successRedirect: '/lobby',
  failureRedirect: '/login',
  failureFlash: true
  }), function(req, res) {
  if (req.body.remember) {
  req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
  } else {
  req.session.cookie.expires = false; // Cookie expires at end of session
  }
  res.redirect('lobby');
  });


module.exports = router;