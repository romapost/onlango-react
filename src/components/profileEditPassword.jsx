import React, {Component, PropTypes} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

const {func, string} = PropTypes;

export default class ChangePasswordForm extends Component {
  static contextTypes = {
    changePassword: func,
    accessToken: string
  }
  state = {};
  change = e => {
    this.setState({[e.target.id]: e.target.value});
  };
  submit = e => {
    e.preventDefault();
    this.context.changePassword(this.state.password, this.context.accessToken);
  };
  render() {
    console.log(this.state);
    return <Row className='panel' style={{padding: '5rem 2rem'}}>
      <Col sm={4} smOffset={4}>
        <form onChange={this.change} onSubmit={this.submit}>
          <FormGroup controlId="password">
            <ControlLabel>Новый пароль</ControlLabel>
            <FormControl type='password' />
          </FormGroup>
          <FormGroup controlId="retype">
            <ControlLabel>Повторный ввод</ControlLabel>
            <FormControl type='password' />
          </FormGroup>
          <Button bsStyle='primary' type='submit' block className='save'>Сменить пароль</Button>
        </form>
      </Col>
    </Row>;
  }
}
