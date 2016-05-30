import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions';

class Login extends React.Component {
  submit = e => {
    e.preventDefault();
    this.props.login(this.refs.email.value, this.refs.password.value);
  };
  render() {
    return <div className='login'>
      <div className='box'>
        <div className='logo text-center'>
          Login to Onlango
        </div>
        <div className='body'>
          <p className='msg'>Sign in to start your session</p>
          <form onSubmit={this.submit}>
            <input type='email' placeholder='Email' ref='email' /><br />
            <input type='password' placeholder='Password' ref='password' /><br />
            <label>
              <input type='checkbox' /> Remember Me
            </label><br />
            <center><button type='submit' className='btn btn-primary btn-block btn-flat'>Sign In</button></center>
          </form>

          <div className='social-auth-links text-center'>
            <p>- OR -</p>
            <a href='##'>Sign in using Google+</a>
          </div>

          {/* <a href='#'>I forgot my password</a><br /> */}
          <Link to='/register' className='text-center'>Register a new membership</Link>
          </div>
      </div>
    </div>;
  }
}

export default typeof window == 'undefined' ? Login : connect(null, dispatch => bindActionCreators({login}, dispatch))(Login);
