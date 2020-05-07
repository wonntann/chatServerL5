var socket = io();

socket.on('new_user', function(data) {
  var username = prompt("Input your username", "Username");
  socket.emit('add_user', {user: username});
})

//Phase 5: 5.6 Starting
// Get message from server
socket.on('new_message', function(data) {
  $('#messages').append(data.message);
});

// Onclick send message 5.6
//Send message to server
function SendMessage() {
  socket.emit('send_message', {message: $("#message").val()});
}
