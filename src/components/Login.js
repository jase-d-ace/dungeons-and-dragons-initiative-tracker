import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      fireRedirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/auth/login',
      data: {
        name: this.state.name,
        password: this.state.password
      }
    })
    .then( data => {
      this.setState({
        fireRedirect: true
      });
    })
    .catch( err => {
      console.log('we messed up', err)
    });
  };

  render() {
    console.log('loaded', this.state)
    return (
      <div className='Login'>
        <h1>Login to get rolling!</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' onChange={this.handleInputChange} name='name' placeholder='your name here' />
          <input type='password' onChange={this.handleInputChange} name='password' placeholder='your password here' />
          <input type='submit' value='let us do it done' />
        </form>
        <Link to='/signup'>Register instead?</Link>
      { this.state.fireRedirect ? <Redirect to='/tracker' /> : '' }
      </div>
    );
  };
};

export default Login;
