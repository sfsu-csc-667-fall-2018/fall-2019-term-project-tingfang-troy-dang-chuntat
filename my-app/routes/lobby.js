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
        // username = req.body.username;
        
        // const io = req.app.get('io')


        // io.on('connection', function(socket) {
        //   console.log("HHow many?")
          // console.log( 'client connected' )
          // console.log(username + "im in the room" + id)
          // // socket.join("room-"+id);
          // //******* */
          // // db.any(`select *`)
  
  
  
  
  
          // //******* */
  
          // socket.join(id);
          // var items = {'name': username, "money":100};
          // var number = io.sockets.adapter.rooms[id].length;
          // console.log(number);
          // io.to(id).emit('cRoom', id);
          // socket.broadcast.to(id).emit('number', "there are"  + number + " users" );
          // // io.sockets.in(id).emit('number', "there are"  + number + " users" );
          // // io.to(id).emit('username', items );
  
  
  
      // }
      // );

    db.any(`SELECT * FROM games `)
      .then ( result => {
        console.log(result)

        res.render('lobby', {username : username, rooms:result})
        // req.io.sockets.emit('message', message => {
        //   console.log(message);
        // }); 
        // var io = req.app.get('socketio');

        // io.emit('message', 'A user has leave the lobby');


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

