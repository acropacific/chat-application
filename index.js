var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
