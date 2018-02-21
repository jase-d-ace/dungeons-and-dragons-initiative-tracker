import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io();

class App extends Component {
  constructor() {
    super();
    this.state = {
      one: 'two',
      three: 'four',
      five: 'six'
    }
  }

  componentDidMount() {
    socket.emit('enter', {
      user: 'test user'
    })
  }

  passTurn() {
    socket.emit('change turn');
  }

  render() {
    //TODO: add logic that will eventually move the game forward.
    console.log('loaded', this.state)
    return (
      <div className="App">
        <h1>Eventually this will turn into a sockets project</h1>
        <button onClick={this.passTurn}>Pass your turn</button>
      </div>
    )
  }
}

export default App;
