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
      activeTurn: false,
      fireRedirect: false
    }
    this.passTurn = this.passTurn.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/characters')
    .then( character => {
      this.setState({
        character: character.data.character
      }, () => {
    socket.emit('enter', {
      room: 'main room',
      user: this.state.character.name
        });
    socket.on('send initiative', (payload) => {
      this.defineTurn(this.state.character.id, payload.current_player.id)
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
    socket.emit('change turn', {
      turn_count: this.state.character.name
    });
  }

  handleFormSubmit(e) {
    e.preventDefault()
    let initiative = Math.ceil(Math.random() * 20)
    this.setState({
      initiativeRolled: true,
    }, () => {
      socket.emit('initiative rolled', {
        player_name: this.state.character.name,
        player_id: this.state.character.id,
        initiative: this.state.initiative
      })
    })
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: parseInt(value)
    })
  }

  defineTurn(playerInitiative, turn) {
    if (playerInitiative === turn) {
      this.setState({
        activeTurn: true
      })
    } else {
      this.setState({
        activeTurn: false
      })
    }
  }

  render() {
    //TODO: add logic that will eventually move the game forward.
    return (
      <div className="Tracker">
      {this.state.character ? <Character {...this.state.character} /> : ''}
      {this.state.activeTurn ? <button onClick={this.passTurn}>Pass your turn</button> : ''}
      {this.state.initiativeRolled ? 'Initiative Rolled! Your battle position is set.' : <form onSubmit={this.handleFormSubmit}> <input type='number' name='initiative' onChange={this.handleInputChange} placeholder='write your dice roll here' min='0' max='30' /> <input type='submit' value='Roll it' /></form>}
        <h1>{this.state.initiativeRolled ? 'Initiative: ' + this.state.initiative : 'Roll for initiative!!'}</h1>
        <h1>{this.state.activeTurn ? 'Your turn! Knock em dead!!' : 'Wait your turn!'}</h1>
        {this.state.fireRedirect ? <Redirect to='/' /> : ''}
      </div>
    )
  }
}

export default Tracker;
