// ========================
// dependencies
// ========================
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



// ========================
// configure middleware
// ========================
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



// ========================
// routes
// ========================
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



// ========================
// global variables and helper function
// ========================
let onlineUsers = 0;
let currentTurn = 1;
let initiativeOrder = [];

// helper function that sorts the initiative order array
const sortInitiative = arr => {
  return arr.sort((a, b) => a.initiative < b.initiative)
}
//set default transport protocol to websocket instead of http polling
io.set('transports', ['websocket']);




// ========================
// socket server
// ========================
io.on('connection', (socket) => {
  //begin tracking socket connections
  socket.on('enter', (payload) => {
    onlineUsers++;
  });

  //socket event called when a player is done with their turn

  /*
    * turn counter is incremented to reflect turn change
    * this is used as a comparison value against the sorted array so that the counter can reset to the top of the order
    * send initiative event is sent to the entire room to allow react to decide whose turn it is based on the id passed from this event
    * if the turn counter hits the end of the array, go back to the beginning ad start over
  */

  socket.on('change turn', (payload) => {
    currentTurn++;
    io.emit('send initiative', {
      current_player: sortInitiative(initiativeOrder)[currentTurn - 1],
      sortedOrder: sortInitiative(initiativeOrder)
    })
    if (currentTurn === initiativeOrder.length) {
      currentTurn = 0;
    }
  });

  //socket event called when a DM removes a monster from the initiative order

  /*
    * payload of this event is the monster information from react.
    * destructure that payload and take only the name from it
    * sort array based on initiative
    * find the index of the monster by matching its name to any of the names inside the SORTED array
    * remove that monster from the sorted array
    * reset the global initiative order variable to the new array without the destroyed monster
    * send the new order to react and continue the flow of the game
  */
  socket.on('monster destroyed', (payload) => {
    let {name, ...rest} = payload
    let sortedOrder = sortInitiative(initiativeOrder);
    let index = sortedOrder.findIndex(monster => monster.name === name);
    let spliceVal = sortedOrder.splice(index, 1);
    initiativeOrder = sortedOrder;
    if (initiativeOrder.length) {
      io.emit('send initiative', {
        current_player: sortInitiative(initiativeOrder)[currentTurn - 1],
        sortedOrder: sortInitiative(initiativeOrder)
      });
    } else {
      io.emit('end battle');
    };
  });

  socket.on('end battle', () => {
    initiativeOrder = [];
    currentTurn = 1;
    io.emit('end battle')
  })

  //socket event that constructs an initiative order based on initiatives passed from react.

  /*
   * payload of this event is the player information from react
   * that information is pushed into the global initiative array variable as an object
   * that array is then sorted using the helper function sortInitiative
   * the sorted array is then sent to react
   * initially, the current_player payload was set to send the first element every time. now it sends the current player
  */

  socket.on('initiative rolled', (payload) => {
    initiativeOrder.push({
      name: payload.player_name,
      id: payload.player_id,
      initiative: payload.initiative
    });
    io.emit('send initiative', {
      current_player: sortInitiative(initiativeOrder)[currentTurn - 1],
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

// ========================
// end of socket server
// ========================


http.listen(PORT, () => {
  console.log(`liveonport${PORT}`);
});
