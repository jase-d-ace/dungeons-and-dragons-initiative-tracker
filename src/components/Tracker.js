import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io();
class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      one: 'two',
      three: 'four',
      five: 'six'
    }
    this.passTurn = this.passTurn.bind(this)
  }

  componentDidMount() {
    socket.emit('enter', {
      room: 'main room',
      user: 'test user'
    })
    socket.on('some event', (payload) => {
      console.log(payload)
    })
    axios.get('/api/characters')
    .then( character => {
      console.log(character.data.character)
    })
    .catch( err => {
      console.log(err)
    })
  }

  leaveRoom() {
    socket.emit('leave room', {
      room: 'main room'
    })
  }

  passTurn() {
    socket.emit('change turn', {
      turn_count: this.state.one
    });
  }
  render() {
    //TODO: add logic that will eventually move the game forward.
    console.log('loaded', this.state)
    return (
      <div className="App">
        <button onClick={this.passTurn}>Pass your turn</button>
        <button onClick={this.leaveRoom}>Leave this room</button>
      </div>
    )
  }
}

export default Tracker;
