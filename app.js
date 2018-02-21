const express = require('express');
const morgan = require('morgan');
const path = require('path');
const socket = require('socket.io');
const app = express();
const http = require('http').Server(app)
const io = socket(http);
const PORT = process.env.PORT || 3000


app.use(morgan('dev'));

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

io.on('connection', (socket) => {
  // TODO: write up the logic for all of the socket connections
  socket.on('enter', (payload) => {
    console.log(`${payload.user} has entered the chat room`)
  })
})

http.listen(PORT, () => {
  console.log(`liveonport${PORT}`)
});
