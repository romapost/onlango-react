import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import {Col, Form, FormGroup, FormControl, Checkbox, Button} from 'react-bootstrap';

const {func, object} = PropTypes;

export default class Register extends Component {
  static contextTypes = {login: func, error: object};
  state = {login: null, retype: null};
  ref = c => {
    if (c) {
      const e = findDOMNode(c);
      this[e.name] = e;
    }
  };
  submit = e => {
    e.preventDefault();
    const [email, password] = ['email', 'password', 'retype'].map(e => this[e].value);
    this.context.login({email, password, register: true});
  };
  change = e => {
    if (this.state.login) this.setState({login: null});
    if (this.retype.value != this.password.value) this.setState({retype: 'error'});
    else this.setState({retype: null});
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.error) this.setState({login: 'error'});
  }
  render() {
    return <div>
      <p className='msg'>Register a new membership</p>
      <Form className='login' onSubmit={this.submit} onChange={this.change}>
        <FormGroup controlId='email' validationState={this.state.login}>
          <FormControl type='email' name='email' placeholder='Email' ref={this.ref} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId='password' validationState={this.state.login}>
          <FormControl type='password' name='password' placeholder='Password' ref={this.ref} />
          <FormControl.Feedback />
          </FormGroup>
        <FormGroup controlId='password' validationState={this.state.retype}>
          <FormControl type='password' name='retype' placeholder='Retype password' ref={this.ref} />
          <FormControl.Feedback />
          </FormGroup>
        <FormGroup>
          <Checkbox>I agree to the <a href='#'>terms</a></Checkbox>
          </FormGroup>
        <FormGroup>
          <Col><Button type='submit' block>Sign in</Button></Col></FormGroup>
      </Form>
      <Link to='login' className='text-center'>I already have a membership</Link>
    </div>;
  }
}
