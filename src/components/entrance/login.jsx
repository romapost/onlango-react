import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import {Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

const {func, object} = PropTypes;

class Login extends Component {
  static contextTypes = {login: func, error: object};
  state = {login: null};
  ref = c => {
    if (c) {
      const e = findDOMNode(c);
      this[e.name] = e;
    }
  };
  submit = e => {
    e.preventDefault();
    const [email, password] = ['email', 'password'].map(e => this[e].value);
    this.context.login({email, password});
  };
  change = () => {
    if (this.state.login) this.setState({login: null});
  };
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.error) this.setState({login: {validationState: 'error'}});
  }
  render() {
    return <div>
      <p className='msg'>Sign in to start your session</p>
      <Form className='login' onSubmit={this.submit} onChange={this.change}>
        <FormGroup controlId='email' {...this.state.login}>
          <FormControl type='email' name='email' placeholder='Email' ref={this.ref}/>
        </FormGroup>
        <FormGroup controlId='password' {...this.state.login}>
          <FormControl type='password' name='password' placeholder='Password' ref={this.ref}/>
        </FormGroup>
        <FormGroup><Col><Button type='submit' block>Sign in</Button></Col></FormGroup>
      </Form>
      <Link to='/register' className='text-center'>Register a new membership</Link>
    </div>;
  }
}

export default Login;
