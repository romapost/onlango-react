import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import inputToData from 'jsx/inputToData';

class Login extends Component {
  static contextTypes = {
    login: PropTypes.func
  }
  state = {};
  handleSubmit = e => {
    e.preventDefault();
    const {email, password} = this.props.data;
    this.context.login({email, password});
  };
  render() {
    return <div>
      <p className='msg'>Sign in to start your session</p>
      <Form className='login' onSubmit={this.handleSubmit} onChange={this.props.handleChange}>
        <FormGroup controlId='email' validationState={this.state.login}>
          <FormControl type='email' name='email' placeholder='Email'/>
        </FormGroup>
        <FormGroup controlId='password' validationState={this.state.login}>
          <FormControl type='password' name='password' placeholder='Password'/>
        </FormGroup>
        <FormGroup><Col><Button type='submit' block>Sign in</Button></Col></FormGroup>
      </Form>
      <Link to='/register' className='text-center'>Register a new membership</Link>
    </div>;
  }
}

export default inputToData(Login);
