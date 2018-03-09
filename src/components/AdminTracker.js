import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
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
  }

  componentDidMount() {
    console.log('mounted')
    socket.emit('enter', {
      room: 'main room',
      user: 'the dm'
    })
    socket.on('send initiative', (payload) => {
      console.log('initiative rolled again')
      this.setState({
        initiativeOrder: payload.sortedOrder
      }, () => {
        this.defineTurn(parseInt(payload.current_player.id))
      })
    })
  }

  renderInitiative() {
    if(this.state.initiativeOrder) {
      return this.state.initiativeOrder.map( el => {
        return (
          <li key={e.id}> {el.name} initiative: {el.initiative}</li>
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

  passTurn() {
    socket.emit('change turn', {
      turn_count: 'monster'
    })
  }

  render() {
    return(
      <div className='AdminTracker'>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' name='monster' onChange={this.handleInputChange} placeholder='add a monster name' />
          <input type='number' min='0' max='30' onChange={this.handleInputChange} name='initiative' />
          <input type='submit' value='add to initiative' />
        </form>
        {this.state.activeTurn ? <button onClick={this.passTurn}>Pass Your Turn</button> : 'Player turn. Let them do their thing.'}
        <ul>
          {this.renderInitiative()}
        </ul>
      </div>
    )
  }
}

export default AdminTracker;
