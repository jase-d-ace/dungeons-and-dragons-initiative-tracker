import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Tracker from './components/Tracker';
import Login from './components/Login';
import Register from './components/Register'
import Admin from './components/Admin';
import AdminRegister from './components/AdminRegister';
import AdminTracker from './components/AdminTracker';

class App extends Component {
 render() {
   return (
     <BrowserRouter>
      <div className="router">
        <Route exact path="/" component={Login} />
        <Route path="/tracker" component={Tracker} />
        <Route path="/signup" component={Register} />
        <Route exact path='/admin' component={Admin} />
        <Route path='/admin/register' component={AdminRegister} />
        <Route path='/admin/tracker' component={AdminTracker} />
      </div>
     </BrowserRouter>
    )
  }
}

export default App;
