import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Admin extends Component {

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
  }

  handleFormSubmit(e) {
    e.preventDefault()
    axios({
      method: 'POST',
      url: '/auth/admin/login',
      data: {
        name: this.state.name,
        password: this.state.password
      }
    })
    .then( admin => {
      this.setState({
        fireRedirect: true
      })
    })
    .catch( err => {
      console.log('nooo', err)
    })
    e.target.reset();
  }

  render() {
    return(
      <div className='Admin'>
        <h1>Welcome, DM</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' name='name' placeholder='write your name' onChange={this.handleInputChange} />
          <input type='password' name='password' placeholder='password' onChange={this.handleInputChange} />
          <input type='submit' value='submit your players to torture' />
        </form>
        <Link to='/admin/register'>Register and submit your players to torture</Link>
        {this.state.fireRedirect ? <Redirect to='/admin/tracker' /> : ''}
      </div>
    )
  };

};

export default Admin
