import {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Col, Form, FormGroup, FormControl, Checkbox, Button} from 'react-bootstrap';
import inputToData from 'inputToData';

class Register extends Component {
  static contextTypes = {
    login: PropTypes.func
  };
  state = {};
  handleChange = e => {
    this.props.handleChange(e);
    if (this.state.login) this.setState({login: undefined});
    const {password, retype} = this.props.data;
    if (retype && retype != password) this.setState({retype: 'error'});
    else this.setState({retype: undefined});
  }
  handleSubmit = e => {
    e.preventDefault();
    const {email, password} = this.props.data;
    this.context.login({email, password, register: true});
  };
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.error) this.setState({login: 'error'});
  }
  render() {
    return <div>
      <p className='msg'>Register a new membership</p>
      <Form className='login' onSubmit={this.handleSubmit} onChange={this.handleChange}>
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
          <Col><Button type='submit' block>Sign in</Button></Col>
        </FormGroup>
      </Form>
      <Link to='login' className='text-center'>I already have a membership</Link>
    </div>;
  }
}

export default inputToData(Register);
