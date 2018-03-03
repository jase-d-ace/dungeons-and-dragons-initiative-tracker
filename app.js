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


let onlineUsers = 0;
let currentTurn = 1;
let initiativeOrder = [];

//set default transport protocol to websocket instead of http polling
io.set('transports', ['websocket']);

io.on('connection', (socket) => {

  socket.on('enter', (payload) => {
    onlineUsers++;
    console.log('online users', onlineUsers)
  });

  socket.on('change turn', (payload) => {
    let sortedOrder = initiativeOrder.sort((a, b) => {
      return a.initiative < b.initiative
    });
    console.log('here is the new order', sortedOrder)
    console.log('turn changin', currentTurn)
    currentTurn++;
    io.emit('send initiative', {
      current_player: sortedOrder[currentTurn - 1]
    })
    if (currentTurn === onlineUsers) {
      currentTurn = 0;
    }
  });

  socket.on('initiative rolled', (payload) => {
    initiativeOrder.push({
      name: payload.player_name,
      id: payload.player_id,
      initiative: payload.initiative
    });
    let sortedOrder = initiativeOrder.sort((a, b) => {
      return a.initiative < b.initiative
    });
    console.log('sending initiative to...', sortedOrder[0].name)
    io.emit('send initiative', {
      current_player: sortedOrder[0]
    })
  });

  socket.on('disconnect', (payload) => {
    if (onlineUsers > 0) {
      onlineUsers--;
      initiativeOrder = [];
      console.log('user has gone')
    } else {
      console.log('no one home')
    }
  })
});

http.listen(PORT, () => {
  console.log(`liveonport${PORT}`);
});
