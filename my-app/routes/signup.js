var express = require('express');
var router = express.Router();
var path = require('path');
const models = require('../models')
var db = require('../db')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

// router.post('/', function(req, res, next) {
//   // res.render('login');
//   console.log(req.body.email)
//   return models.user.create({
//     email: req.body.email,
//     username: req.body.username,
//     password:req.body.password
//   }).then( ()=> {
//     res.redirect('/')
//   }
//   )
// });

router.post("/", (request, response) => {
  db.any(`INSERT INTO "Users" ("username","password","email") VALUES ('${request.body.username}','${request.body.password}','${request.body.email}')`)
  .then( _ => db.any(`SELECT * FROM "Users"`) )
  .then( response.redirect('/') )
  .catch( error => {
  console.log( error )
  response.json({ error })
  })
  });


module.exports = router;