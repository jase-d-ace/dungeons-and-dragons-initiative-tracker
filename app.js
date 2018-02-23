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

app.use('/api/characters', require('./routes/character-routes'))

// TODO: write up the logic for all of the socket connections

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
    console.log('turn has been passed', payload)
    if (currentTurn < onlineUsers) {
      currentTurn++;
      console.log(payload, 'from change turn event')
    };
    socket.emit('inform', {
     current_turn: `it is currently ${payload.turn_count}'s turn`
    });
    if (currentTurn === onlineUsers) {
      currentTurn = 1;
    }
    console.log(currentTurn)
  });

  socket.on('initiative rolled', (payload) => {
    console.log(`${payload.player_name} rolled a ${payload.initiative} on initiative`)
  })

  socket.on('leave room', (payload) => {
    if (onlineUsers > 0) {
      onlineUsers--;
      console.log('a user has left the room')
    };
    console.log('no users left');
  })
});

http.listen(PORT, () => {
  console.log(`liveonport${PORT}`);
});
