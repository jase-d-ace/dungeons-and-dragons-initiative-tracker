import React, { Component } from 'react';

import Tracker from './components/Tracker';
class App extends Component {
 render() {
   return (
      <div className="App">
        <h1>Oh hey, this is a sockets project</h1>
        <Tracker />
      </div>
    )
  }
}

export default App;
