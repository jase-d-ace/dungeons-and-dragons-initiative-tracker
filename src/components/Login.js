import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../styles/main.css'

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
      url: '/auth/player/login',
      data: {
        name: this.state.name.toLowerCase(),
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
    e.target.reset();
  };

  render() {
    return (
      <div className='Login'>
        <h1>Login to get rolling!</h1>
        <form onSubmit={this.handleFormSubmit} className='form-container'>
          <input type='text' className='input-field' onChange={this.handleInputChange} name='name' placeholder='name' />
          <input type='password' className='input-field' onChange={this.handleInputChange} name='password' placeholder='password' />
          <input type='submit' className='input-field submit-button' value='let us do it' />
        </form>
        <Link to='/signup'>Register instead?</Link>
        <Link to='/admin'>Log in as DM instead?</Link>
      { this.state.fireRedirect ? <Redirect to='/tracker' /> : '' }
      </div>
    );
  };
};

export default Login;
