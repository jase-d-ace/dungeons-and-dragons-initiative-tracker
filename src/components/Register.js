import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

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
    })
  };

  handleFormSubmit(e) {
    e.preventDefault();
    axios({
      method:'POST',
      url: '/auth/player/register',
      data: {
        name: this.state.name.toLowerCase(),
        password: this.state.password
      }
    })
    .then( user => {
      this.setState({
        fireRedirect: true
      })
    })
    .catch( err =>{
      console.log(err)
    })
  }

  render() {
    return(
      <div className='Register'>
        <h1>So ye want to play some dnd, eh?</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' onChange={this.handleInputChange} name='name' placeholder='your name here' />
          <input type='password' onChange={this.handleInputChange} name='password' placeholder='your password here' />
          <input type='submit' value='lets get started' />
        </form>
      { this.state.fireRedirect ? <Redirect to='/' /> : '' }
      </div>
    )
  }

};

export default Register;
