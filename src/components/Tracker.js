import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io();
class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      character: null
    }
    this.passTurn = this.passTurn.bind(this)
  }

  componentDidMount() {
    socket.emit('enter', {
      room: 'main room',
      user: 'test user'
    })
    socket.on('some event', (payload) => {
      console.log(payload.current_turn)
    })
    socket.on('inform', (payload) => {
      console.log(payload)
    })
    axios.get('/api/characters')
    .then( character => {
      this.setState({
        character: character.data.character
      })
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
    console.log(this.state, 'from passTurn')
    socket.emit('change turn', {
      turn_count: this.state.character.name
    });
  }
  render() {
    //TODO: add logic that will eventually move the game forward.
    console.log('loaded', this.state)
    return (
      <div className="Tracker">
        <button onClick={this.passTurn}>Pass your turn</button>
        <button onClick={this.leaveRoom}>Leave this room</button>
      </div>
    )
  }
}

export default Tracker;
