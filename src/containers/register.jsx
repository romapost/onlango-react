import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {register} from '../actions';

class Register extends React.Component {
  submit = e => {
    e.preventDefault();
    this.props.register(this.refs.email.value, this.refs.password.value);
  }
  render() {
    return <div className='register'>
      <div className='box'>
        <div className='logo text-center'>
          Register to Onlango
        </div>

        <div className='body'>
          <p className='msg'>Register a new membership</p>
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
      </div>
    </div>;
  }
}

export default typeof window == 'undefined' ? Register : connect(null, dispatch => bindActionCreators({register}, dispatch))(Register);
