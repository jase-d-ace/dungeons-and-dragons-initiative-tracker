import React, { Component } from 'react';
import services from '../services';
import { Redirect, Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/login.css';

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
    services.authenticate(this.state, '/auth/admin/login')
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
      <div className='Login'>
        <div className='login-container'>
          <div className='header'>
            <h1>Welcome, DM</h1>
          </div>
          <form className='form-container' onSubmit={this.handleFormSubmit}>
            <input className='input-field' type='text' name='name' placeholder='write your name' onChange={this.handleInputChange} />
            <input className='input-field' type='password' name='password' placeholder='password' onChange={this.handleInputChange} />
            <input className='input-field submit-button' type='submit' value='submit your players to torture' />
          </form>
          <div className='link-container'>
            <Link to='/admin/register'>Register and submit your players to torture</Link>
        </div>
          {this.state.fireRedirect ? <Redirect to='/admin/tracker' /> : ''}
        </div>
      </div>
    )
  };

};

export default Admin
