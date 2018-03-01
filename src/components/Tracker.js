import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Character from './Character';
//found the fix for the refresh bug here:
//https://stackoverflow.com/questions/41924713/node-js-socket-io-page-refresh-multiple-connections
const socket = io({ transports: ['websocket'], upgrade: false });

class Tracker extends Component {

  constructor() {
    super();
    this.state = {
      character: null,
      initiativeRolled: false,
      fireRedirect: false
    }
    this.passTurn = this.passTurn.bind(this)
    this.rollInitiative = this.rollInitiative.bind(this)
  }

  componentDidMount() {
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
      this.setState({
        fireRedirect: true
      })
      console.log(err)
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
      {this.state.initiativeRolled ? 'Initiative Rolled! Your battle position is set.' : <button onClick={this.rollInitiative}>Roll Initiative!</button>}
        <h1>{this.state.initiativeRolled ? 'Initiative: ' + this.state.initiative : 'Roll for initiative!!'}</h1>
        {this.state.fireRedirect ? <Redirect to='/' /> : ''}
      </div>
    )
  }
}

export default Tracker;
