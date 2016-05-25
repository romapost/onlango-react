import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

export default class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  submit = e => {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: JSON.stringify({
        email: this.refs.email.value,
        password: this.refs.password.value
      }),
      contentType: 'application/json'
    }).done((data) => {
      console.log(data);
      if ('accessToken' in data) localStorage.setItem('accessToken', data.accessToken);
      if ('refreshToken' in data) localStorage.setItem('refreshToken', data.refreshToken);
      this.context.router.push('/');
    }).fail((jqXHR, textStatus, error) => {
      console.log(textStatus, error);
      if (error == 'Unauthorized') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    });
  };
  render() {
    return <div className='login-box'>
      <div className='login-logo'>
        Login to Onlango
      </div>
      <div className='login-box-body'>
        <p className='login-box-msg'>Sign in to start your session</p>
        <form onSubmit={this.submit}>
          <input type='email' placeholder='Email' ref='email' /><br />
          <input type='password' placeholder='Password' ref='password' /><br />
          <label>
            <input type='checkbox' /> Remember Me
          </label><br />
          <center><button type='submit'>Sign In</button></center>
        </form>

        <div className='social-auth-links text-center'>
          <p>- OR -</p>
          <a href='##'>Sign in using Google+</a>
        </div>

        {/* <a href='#'>I forgot my password</a><br /> */}
        <Link to='/register' className='text-center'>Register a new membership</Link>
      </div>
    </div>;
  }
}
