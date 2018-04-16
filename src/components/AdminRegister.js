import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class AdminRegister extends Component {

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
      url: '/auth/admin/register',
      data: {
        name: this.state.name.toLowerCase(),
        password: this.state.password
      }
    })
    .then( admin => {
      this.setState({
        fireRedirect: true
      })
    })
    .catch( err => {
      console.log('noooo', err);
    })
  };

  render() {
    return (
      <div className='AdminRegister'>
        <h1>Welcome, DM. Tell us your story</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' name='name' onChange={this.handleInputChange} placeholder='write your name here' />
          <input type='password' name='password' onChange={this.handleInputChange} placeholder='write your password here' />
          <input type='submit' value='start torturing your players' />
        </form>
        {this.state.fireRedirect ? <Redirect to='/admin/tracker' /> : ''}
      </div>
    )
  }

};

export default AdminRegister
