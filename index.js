const express = require('express');
const socket = require('socket.io');

// App Set UP

const app = express();
const server = app.listen(4000, () => {
 console.log('Listening to request on Port 4000');
});

//Static files/ Middleware this will serve up the html files and css
app.use(express.static('public'));

//Setting up socket.io on the backend/ server.., this is a server we wanna work with
//This is going to wait for the connection from the frontend..
const io = socket(server); // this takes in an argument of the server thats running it

// we listen for a connection
io.on('connection', (socket) => { //This takes in an argument of socket(individual connection F end)
 console.log('Made socket connection', socket.id);
 //listening for chat message
 socket.on('chat', function (data) {
  console.log(data.handle, data.message);
  // to send them out back to all chattters
  io.sockets.emit('chat', data);
 });
 socket.on('typing', function (data) {
  socket.broadcast.emit("typing", data);
 });
});