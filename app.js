const express = require('express');
const morgan = require('morgan');
const path = require('path');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const http = require('http').Server(app);
const io = socket(http);
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(morgan('dev'));

app.use(express.static('build'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());


app.use('/auth', require('./routes/auth-routes'));
app.use('/api/characters', require('./routes/character-routes'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'this is not the page you are looking for'
  });
});

// TODO: write up the logic for all of the socket connections

let onlineUsers = 0;
let currentTurn = 0;
io.set('transports', ['websocket']);
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

  socket.on('disconnect', (payload) => {
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
