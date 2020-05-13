var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db')
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup',  {messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')} });
});


router.post("/", async (request, response) => {
  var pwd = await bcrypt.hash(request.body.password, 5);
  db.any(`INSERT INTO "Users" ("username","password","email") VALUES ('${request.body.username}','${pwd}','${request.body.email}')`)
  .then( _ => db.any(`SELECT * FROM "Users"`) )
  .then( () => {
    request.flash('success', 'User created.')
    response.redirect('/login') 
  }
    )
  .catch( error => {
  console.log( error )
  response.json({ error })
  })
  }
  
  );


module.exports = router;