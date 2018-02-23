import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Character from './Character';
const socket = io();

class Tracker extends Component {

  constructor() {
    super();
    this.state = {
      character: null,
      initiativeRolled: false
    }
    this.passTurn = this.passTurn.bind(this)
    this.rollInitiative = this.rollInitiative.bind(this)
  }

  componentDidMount() {
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
      }, () => {
    socket.emit('enter', {
      room: 'main room',
      user: this.state.character.name
    })
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

  rollInitiative() {
    let initiative = Math.ceil(Math.random() * 20)
    this.setState({
      initiativeRolled: true,
      initiative
    }, () => {
      socket.emit('initiative rolled', {
        player_name: this.state.character.name,
        initiative: this.state.initiative
      })
    })
  }

  render() {
    //TODO: add logic that will eventually move the game forward.
    console.log('loaded', this.state)
    return (
      <div className="Tracker">
      {this.state.character ? <Character {...this.state.character} /> : ''}
        <button onClick={this.passTurn}>Pass your turn</button>
        <button onClick={this.leaveRoom}>Leave this room</button>
        <button onClick={this.rollInitiative}>Roll Initiative!</button>
        <h1>{this.state.initiativeRolled ? 'Initiative: ' + this.state.initiative : 'Roll for initiative!!'}</h1>
      </div>
    )
  }
}

export default Tracker;
