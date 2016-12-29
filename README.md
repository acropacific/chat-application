# Chat Application
Following are the details to get started with NodeJS


## Install Node.JS and NPM

```javascript
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

## Create Chat application
-------------------------------

* First let’s create a package.json manifest file that describes our project. I recommend you place it in a dedicated empty directory.
```javascript
{
  "name": "socket-chat-example",
  "version": "0.0.1",
  "description": "my first socket.io app",
  "dependencies": {}
}
```
* Now, in order to easily populate the dependencies with the things we need, we’ll use
```javascript
npm install --save express@4.10.2
npm install --save socket.io
```
* Now that express and socket.io is installed we can create an index.js file that will setup our application.
```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

* Now for UI create index.html file and use below code
```javascript
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px 10px 0px}
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
    <script>
      var socket = io();
      $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
      });
    </script>
  </body>
</html>
```

* Now open terminal and run below command
```javascript
node index.js
```
* Point your browser to http://localhost:3000

### Thanks
