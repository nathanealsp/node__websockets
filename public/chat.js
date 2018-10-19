// make connection to server
const socket = io.connect('http://localhost:4000'); //we have access to io because of the socket.io library..
// add where u want to make the connection

const message = document.querySelector('#message');
const handle = document.querySelector('#handle');
const btn = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

btn.addEventListener('click', function () {
 socket.emit('chat', {
  handle: handle.value,
  message: message.value
 });
});

message.addEventListener('keypress', function () {
 socket.emit('typing', handle.value);
});

// listen for events, as in messages from server..
socket.on('chat', function (data) {
 feedback.innerHTML = "";
 output.innerHTML += "<p><strong>" + data.handle + "; </strong>" + data.message + "</P>";
});

socket.on('typing', function (data) {
 feedback.innerHTML = "<p><em>" + data + " is typing......" + "</P>";
});