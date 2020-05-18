const socketIo = require( 'socket.io' )
const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )

const init = ( app, server ) => {
const io = socketIo( server )

  app.set( 'io', io )
  var bitches_in_lobby = []
  var rooms = []
var db = require ('../db')

  io.on( 'connection', socket => {

    var numClients = {};

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


        setTimeout(function(){
        
            db.any(`SELECT username FROM "user-room" WHERE "roomID" = '${id}' `)
                .then( results => {
                    console.log("print user room")
                    console.log(results);
                    socket.emit('updateRooms', results);

                    socket.emit('updateUserGame',  'you have connected to room');
                    socket.emit('loadUserSeat', results )
                    var clients = io.sockets.adapter.rooms[id].sockets;   
                    //to get the number of clients
                    var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
                    console.log(numClients)
                    socket.emit('updateUserSeat', username , numClients )
                    socket.broadcast.to(id).emit('updateUserSeat',  username , numClients);

                    socket.broadcast.to(id).emit('updateUserGame',  username + ' has connected');
                 })
        }, 1000);

        }
        )

    socket.on('sendChat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updateChat', socket.username, data);
    });


	socket.on('switchRoom', function(newroom){
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updateUser',  'you have connected to '+ newroom);
        if (newroom == "lobby" ) {
            numClients[socket.room]--;
            socket.broadcast.to(socket.room).emit('updateUserGame',  socket.username+' has left this room');
        }
        else {
        
        socket.broadcast.to(socket.room).emit('updateUser',  socket.username+' has left this room');
        }
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