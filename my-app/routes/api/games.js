 
 var express = require('express');
 var router = express.Router();
 var path = require('path');
 var db = require('../../db');
 /* GET home page. */
 router.get('/:id', function(request, response) {
     if(request.isAuthenticated()) {
        
     const { id } = request.params;
     var {user} = request ;
     username = user['username'];     // response.render('games', { id });
     console.log(username)

     response.render('games', {id:id, username:username})
     }
 });
 
 
 
 
 module.exports = router;