const express = require('express');
const morgan = require('morgan');
const path = require('path');
const socket = require('socket.io');
const app = express();
const http = require('http').Server(app);
const io = socket(http);
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

// TODO: write up the logic for all of the socket connections
let onlineUsers = 0;
io.on('connection', (socket) => {
  //socket event for entry
  socket.on('enter', (payload) => {
    onlineUsers++;
    console.log(`there are currently ${onlineUsers} users inside`)
    console.log(`${payload.user} has entered ${payload.room}`)
    socket.join(payload.room)
  });
  //socket event for changing turns
  socket.on('change turn', (payload) => {
    console.log('turn has been passed', payload.turn_count)
  });

  socket.on('leave room', (payload) => {
    onlineUsers--;
    socket.leave(payload.room)
    console.log('a user has disconnected from', payload.room)
  })
});

http.listen(PORT, () => {
  console.log(`liveonport${PORT}`);
});
