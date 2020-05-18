 
 var express = require('express');
 var router = express.Router();
 var path = require('path');
 var db = require('../../db');
 var gameState = require('./game_logic')
 
 
 /* GET home page. */
 router.get('/:id', function(request, response) {
     if(request.isAuthenticated()) {
        
     var { id } = request.params;
     var {user} = request ;
     username = user['username'];
     db.any(`SELECT *  FROM "user-room" WHERE  "roomID" = '${id}' AND username = '${username}'`)
     .then ( (result) => {
        console.log("checking");
        console.log(result);
        if (result.length == 0) {
            db.any(`INSERT INTO "user-room" ("username","roomID") VALUES ('${username}','${id}')`)
            .then(() => {
               response.render('games', {id:id, username:username})
            })
        }
        else {
         response.render('games', {id:id, username:username})
      }
     }) 
     .catch(
        error => {console.log(error)}

     )
     }
 });
 
 
 
 
 module.exports = router;