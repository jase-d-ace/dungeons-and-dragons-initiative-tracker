import React, { Component } from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom'
import '../styles/main.css';
import '../styles/tracker.css';
const socket = io({ transports: ['websocket'], upgrade: false })

class AdminTracker extends Component {

  constructor() {
    super();
    this.state = {
      initiativeOrder: null,
      activeTurn: false,
      monster: '',
      initiative: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.killMonster = this.killMonster.bind(this);
    this.endBattle = this.endBattle.bind(this);
  }

  componentDidMount() {
    socket.emit('enter', {
      room: 'main room',
      user: 'the dm'
    });
    socket.on('send initiative', (payload) => {
      this.setState({
        initiativeOrder: payload.sortedOrder
      }, () => {
        this.defineTurn(parseInt(payload.current_player.id))
      });
    });
    socket.on('end battle', (payload) => {
      this.setState({
        initiativeOrder: null
      });
    });
  };

  renderInitiative() {
    if(this.state.initiativeOrder) {
      return this.state.initiativeOrder.map( el => {
        return (
          <li key={el.id}>
            {el.name} initiative: {el.initiative} <button onClick={() => this.killMonster(el)}>Kill this monster?</button>
          </li>
        )
      })
    } else {
      return(
        <h1>Wait for initiatives</h1>
      )
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    socket.emit('initiative rolled', {
      player_name: this.state.monster,
      player_id: 0,
      initiative: parseInt(this.state.initiative)
    })
  }

  defineTurn(playerInitiative) {
    if (playerInitiative === 0) {
      this.setState({
        activeTurn: true
      })
    } else {
      this.setState({
        activeTurn: false
      })
    }
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  killMonster(monster) {
    socket.emit('monster destroyed', {
      ...monster
    })
  }

  passTurn() {
    socket.emit('change turn', {
      turn_count: 'monster'
    })
  }

  endBattle() {
    socket.emit('end battle');
  }

  render() {
    return(
      <div className='Tracker'>
        <form onSubmit={this.handleFormSubmit}>
          <input className='input-field tracker-input-field' type='text' name='monster' onChange={this.handleInputChange} placeholder='add a monster name' />
          <input className='input-field tracker-input-field' type='number' min='0' max='30' onChange={this.handleInputChange} name='initiative' />
          <input className='input-field tracker-input-field submit-button' type='submit' value='add to initiative' />
        </form>
        {this.state.activeTurn ? <button onClick={this.passTurn}>Pass Your Turn</button> : 'Player turn. Let them do their thing.'}
        <ul>
          {this.renderInitiative()}
        </ul>
        <button onClick={this.endBattle}>End the battle?</button>
      </div>
    )
  }
}

export default AdminTracker;
