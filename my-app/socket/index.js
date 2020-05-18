const socketIo = require( 'socket.io' )
const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )

const init = ( app, server ) => {
const io = socketIo( server )

  app.set( 'io', io )
  var bitches_in_lobby = []
  var rooms = []
var db = require ('../db')
  io.on( 'connection', socket => {


    socket.on("joinLobby", function(username){
        socket.room ='lobby'
        socket.username = username
        // console.log("Bitch joined lobby " + username)
        bitches_in_lobby.push(username)
        // console.log(bitches_in_lobby)
        socket.join('lobby')
        socket.emit('updateUser',  'you have connected to lobby');
        socket.broadcast.to('lobby').emit('updateUser',  username + ' has connected');
        db.any(`SELECT * FROM games `)
        .then( results => {
            socket.emit('updateRooms', results);


        })
        }
    )


    socket.on("joinGame", function(username, id){
        // id = id.toString();
        // socket.room = id
        socket.username = username
        // console.log("Bitch joined lobby " + username)
        bitches_in_lobby.push(username)
        // console.log(bitches_in_lobby)
        socket.join(id)
        socket.emit('updateUserGame',  'you have connected to room');
        socket.broadcast.to(id).emit('updateUserGame',  username + ' has connected');
        }
    )

    socket.on('sendChat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updateChat', socket.username, data);
    });


	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updateUser',  'you have connected to '+ newroom);
        // sent message to OLD room

        if (newroom == "lobby" ) {
            socket.broadcast.to(socket.room).emit('updateUserGame',  socket.username+' has left this room');

        }
        else {
        socket.broadcast.to(socket.room).emit('updateUser',  socket.username+' has left this room');
        }
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updateUser',  socket.username+' has joined ' + newroom);
		// socket.emit('updaterooms', rooms, newroom);
    });
    
    socket.on('createRoom', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        // db.any(`SELECT * FROM games WHERE creator=$1 Order By "createdAt" Desc Limit 1`, [data])

        setTimeout(function(){
            db.any(`SELECT * FROM games `)
            .then( results => {
                socket.broadcast.to('lobby').emit('updateRooms', results);  
            })
        }, 2000);

        });
    
    // socket.on('CreateRoom', function(id, username){
    //         socket.join(id) // Creates room1
    //         rooms.push(id) // Creates List names of rooms
    //         console.log("We Joined Room: " + id)
    //         socket.broadcast.to(id).emit('joinedUser', "User has joined")
    // });

	socket.on('disconnect', function(){
		// remove the username from global usernames list
		// delete usernames[socket.username];
		// update list of users in chat, client-side
		// io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updateUser', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});



    });
    
    


    // socket.on( USER_JOINED, data => io.emit( USER_JOINED, data ))
    // socket.on( MESSAGE_SEND, data => io.emit( MESSAGE_SEND, data ))

}

module.exports = { init }