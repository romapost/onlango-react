import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

export default class Register extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  submit = e => {
    e.preventDefault();
    $.ajax({
      url: '/api/register',
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
  }
  render() {
    return <div className='register-box'>
      <div className='register-logo'>
        Register to Onlango
      </div>

      <div className='register-box-body'>
        <p className='login-box-msg'>Register a new membership</p>
        <form onSubmit={this.submit}>
          <input type='email' placeholder='Email' ref='email'/><br />
          <input type='password' placeholder='Password' ref='password'/><br />
          <input type='password' placeholder='Retype password' ref='retype'/><br />
          <label>
            <input type='checkbox' /> I agree to the <a href='#'>terms</a>
          </label><br />
          <center><button type='submit' className='btn btn-primary btn-block btn-flat'>Register</button></center>
        </form>

        <div className='social-auth-links text-center'>
          <p>- OR -</p>
          <a href='##'>Sign up using Google+</a>
        </div>

        <Link to='login' className='text-center'>I already have a membership</Link>
      </div>
    </div>;
  }
}
