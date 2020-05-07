const express = require('express');
const app = express();

var http = require('http');

var server = http.Server(app);

var io = require('socket.io')(server);

var users = [];

app.use('/client', express.static(__dirname + '/client'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(3001, () => {
  console.log("Server Started");
});

io.on('connection', function(socket) {
  socket.emit('new_user');

  //5.6 Get message from client and send to all clients
  socket.on('send_message', function(data) {
    var username = users[socket.id];
    io.emit('new_message', {message: "<li>" + username + ": " + data.message + "</li>"});
  })

  socket.on('add_user', function(user) {
    users[socket.id] = user.user;
    io.emit('new_message', {message: "<li>" + user.user + " has joined the chat</li>"})
  })
});