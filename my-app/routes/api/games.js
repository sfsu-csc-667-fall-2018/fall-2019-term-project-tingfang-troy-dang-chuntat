 
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
     username = user['username'];     // response.render('games', { id });
    //  console.log("AAAA" , gameState.Game())
    // const io = request.app.get('io')
    // console.log("Happened")

    // // db.any(`INSERT INTO user-room ("username","roomID") VALUES ('${username}','${id}')`)


    // io.on('connection', function(socket) {
    //     console.log("HHow many?")
    //     // console.log( 'client connected' )
    //     // console.log(username + "im in the room" + id)
    //     // // socket.join("room-"+id);
    //     // //******* */
    //     // // db.any(`select *`)





    //     // //******* */

    //     // socket.join(id);
    //     // var items = {'name': username, "money":100};
    //     // var number = io.sockets.adapter.rooms[id].length;
    //     // console.log(number);
    //     // io.to(id).emit('cRoom', id);
    //     // socket.broadcast.to(id).emit('number', "there are"  + number + " users" );
    //     // // io.sockets.in(id).emit('number', "there are"  + number + " users" );
    //     // // io.to(id).emit('username', items );



    // }
    // );
    // console.log( io.sockets.clients("test")+ " users connected" );

    

     response.render('games', {id:id, username:username})
     }
 });
 
 
 
 
 module.exports = router;