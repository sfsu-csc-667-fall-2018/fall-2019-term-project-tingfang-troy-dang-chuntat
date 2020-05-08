var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res){
 
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    req.flash('success', "Logged out. See you soon!");
    res.redirect('/');
    });

    module.exports = router;