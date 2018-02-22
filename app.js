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
// TODO: I need to be able to track a turn, and if it hits the number of online users, go back to zero. This will be how I track whose turn it is based on how many people are in the game

let onlineUsers = 0;
let currentTurn = 0;
io.on('connection', (socket) => {
  //socket event for entry
  socket.on('enter', (payload) => {
    onlineUsers++;
    console.log(onlineUsers)
    console.log(`there are currently ${onlineUsers} users inside`)
    console.log(`${payload.user} has entered ${payload.room}`)
    socket.emit('some event', {
      testing: 'stuff'
    });
  });
  //socket event for changing turns
  socket.on('change turn', (payload) => {
    // console.log('turn has been passed', payload.turn_count)
    if (currentTurn < onlineUsers) {
      currentTurn++;
      console.log(currentTurn, 'from change turn event')
      socket.emit('some event', {
        current_turn: `it is currently ${currentTurn}'s turn`
      })
    };
    if (currentTurn === onlineUsers) {
      currentTurn = 0;
    }
    console.log(currentTurn)
  });

  socket.on('leave room', (payload) => {
    while (onlineUsers > 0) {
      onlineUsers--;
      console.log('a user has left the room')
    };
    console.log('no users left');
  })
});

http.listen(PORT, () => {
  console.log(`liveonport${PORT}`);
});
