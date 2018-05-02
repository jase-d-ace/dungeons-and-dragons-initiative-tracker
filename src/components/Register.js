import React, { Component } from 'react';
import services from '../services';
import { Redirect, Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/login.css';

class Register extends Component {

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
    services.authenticate(this.state, '/auth/player/register')
      .then( user => {
      this.setState({
        fireRedirect: true
      });
    })
    .catch( err =>{
      console.log(err)
    });
  };

  render() {
    return (
      <div className='Login'>
        <div className='login-container'>
          <h1>So ye want to play some dnd, eh?</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input className='input-field'  type='text' onChange={this.handleInputChange} name='name' placeholder='your name here' />
            <input className='input-field'  type='password' onChange={this.handleInputChange} name='password' placeholder='your password here' />
            <input className='input-field' type='submit' value='lets get started' />
          </form>
        { this.state.fireRedirect ? <Redirect to='/' /> : '' }
        </div>
      </div>
    );
  };

};

export default Register;
