const socketIo = require( 'socket.io' )
const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )

const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )
  var bitches_in_lobby = []
  var rooms = []

  io.on( 'connection', socket => {
    console.log( 'client connected' )
    socket.on("joinLobby", function(username){
        socket.room ='lobby'
        socket.username = username
        // console.log("Bitch joined lobby " + username)
        bitches_in_lobby.push(username)
        console.log(bitches_in_lobby)
        socket.join('lobby')
        socket.emit('updateUser',  'you have connected to lobby');
        socket.broadcast.to('lobby').emit('updateUser',  username + ' has connected');
        }
    )

    socket.on('sendChat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        console.log("AAAAA" + socket.room)
		io.sockets.in(socket.room).emit('updateChat', socket.username, data);
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