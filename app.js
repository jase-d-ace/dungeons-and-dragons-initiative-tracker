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

const sortInitiative = arr => {
  return arr.sort((a, b) => a.initiative < b.initiative)
}

//set default transport protocol to websocket instead of http polling
io.set('transports', ['websocket']);

//open socket connection server
io.on('connection', (socket) => {
  //begin tracking socket connections
  socket.on('enter', (payload) => {
    onlineUsers++;
  });

  socket.on('change turn', (payload) => {
    currentTurn++;
    io.emit('send initiative', {
      current_player: sortedOrder[currentTurn - 1],
      sortedOrder: sortInitiative(initiativeOrder)
    })
    if (currentTurn === initiativeOrder.length) {
      currentTurn = 0;
    }
  });

  socket.on('monster destroyed', (payload) => {
    // console.log('need an array, so...', payload.foo.name)
    let {name, initiative, ...rest} = payload
    let sortedOrder = sortInitiative(initiativeOrder);
    let index = sortedOrder.findIndex(monster => monster.name === name);
    let spliceVal = sortedOrder.splice(index, 0);
    console.log(sortedOrder)
  })

  socket.on('initiative rolled', (payload) => {
    initiativeOrder.push({
      name: payload.player_name,
      id: payload.player_id,
      initiative: payload.initiative
    });
    console.log('new initiative order', sortInitiative(initiativeOrder))
    io.emit('send initiative', {
      current_player: sortInitiative(initiativeOrder)[0],
      sortedOrder: sortInitiative(initiativeOrder)
    })
  });

  socket.on('disconnect', (payload) => {
    if (onlineUsers > 0) {
      onlineUsers--;
    } else {
      console.log('no one home')
    };
  });
});

http.listen(PORT, () => {
  console.log(`liveonport${PORT}`);
});
