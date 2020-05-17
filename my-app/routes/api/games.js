 
 var express = require('express');
 var router = express.Router();
 var path = require('path');
 var db = require('../../db');
 var gameState = require('./game_logic')
 
 
 /* GET home page. */
 router.get('/:id', function(request, response) {
     if(request.isAuthenticated()) {
        
     const { id } = request.params;
     var {user} = request ;
     username = user['username'];     // response.render('games', { id });
    //  console.log("AAAA" , gameState.Game())

     response.render('games', {id:id, username:username})
     }
 });
 
 
 
 
 module.exports = router;