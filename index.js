const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('connected', () => {
    io.emit('connected', 'A user connected');
  });

  socket.on('chat message', (data) => {
    console.log('message', data);
    io.emit('chat message', data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
