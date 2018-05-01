import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/login.css';

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
        <div className='login-container'>
          <div className='header'>
            <h1>Login to get rolling!</h1>
          </div>
          <form onSubmit={this.handleFormSubmit} className='form-container'>
            <input type='text' className='input-field' onChange={this.handleInputChange} name='name' placeholder='name' />
            <input type='password' className='input-field' onChange={this.handleInputChange} name='password' placeholder='password' />
            <input type='submit' className='input-field submit-button' value='let us do it' />
          </form>
          <div className='link-container'>
            <Link className='link' to='/signup'>Register instead?</Link>
            <Link className='link' to='/admin'>Log in as DM instead?</Link>
          </div>
        { this.state.fireRedirect ? <Redirect to='/tracker' /> : '' }
        </div>
      </div>
    );
  };
};

export default Login;
