import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Tracker from './components/Tracker';
import Login from './components/Login';
import Register from './components/Register'
// TODO: create login component and then start on auth...
class App extends Component {
 render() {
   return (
     <BrowserRouter>
      <div className="router">
        <Route exact path="/" component={Login} />
        <Route path="/tracker" component={Tracker} />
        <Route path="/signup" component={Register} />
      </div>
     </BrowserRouter>
    )
  }
}

export default App;
