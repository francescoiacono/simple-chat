const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('connected', () => {
    io.emit('connected');
  });

  socket.on('chat message', (data) => {
    socket.broadcast.emit('chat message', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('not typing', (data) => {
    socket.broadcast.emit('not typing', data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
