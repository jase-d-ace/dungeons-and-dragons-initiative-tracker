import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io()
class AdminTracker extends Component {

  constructor() {
    super();
    this.state = {
      initiativeOrder: null
    }
  }

  componentDidMount() {
    socket.emit('enter')
    socket.on('send initiative', (payload) => {
      this.setState({
        initiativeOrder: payload.sortedOrder
      })
    })
  }

  render() {
    console.log('loaded', this.state)
    return(
      <h1>Admin path is live!</h1>
    )
  }
}

export default AdminTracker
