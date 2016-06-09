import React, {Component, PropTypes} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

const {func, object, string} = PropTypes;

class ChangePasswordForm extends Component {
  static contextTypes = {
    changePassword: func,
    accessToken: string,
    error: object
  }
  state = {submitDisabled: false};
  change = e => {
    this.setState({[e.target.id]: e.target.value});
  };
  submit = e => {
    e.preventDefault();
    this.context.changePassword(this.state.password, this.context.accessToken);
  };
  setRetypeWarning = (retypeWarning, bool) => {
    if (bool && !retypeWarning) this.setState({retypeWarning: {validationState: 'warning'}});
    else if (!bool && retypeWarning) this.setState({retypeWarning: undefined});
  };
  setSubmitDisabled = (submitDisabled, bool) => {
    if (bool && !submitDisabled) this.setState({submitDisabled: true});
    else if (!bool && submitDisabled) this.setState({submitDisabled: false});
  }
  componentWillUpdate(nextProps, nextState) {
    const {password, retype, retypeWarning, submitDisabled} = nextState;
    const match = (password && (password == retype));
    this.setRetypeWarning(retypeWarning, !match && retype);
    this.setSubmitDisabled(submitDisabled, !match || !retype);
  }
  render() {
    return <Row className='panel' style={{padding: '5rem 2rem'}}>
      <Col sm={4} smOffset={4}>
        <form onChange={this.change} onSubmit={this.submit}>
          <FormGroup controlId='password'>
            <ControlLabel>Новый пароль</ControlLabel>
            <FormControl type='password' />
          </FormGroup>
          <FormGroup controlId='retype' {...this.state.retypeWarning}>
            <ControlLabel>Повторный ввод</ControlLabel>
            <FormControl type='password' />
            <FormControl.Feedback />
          </FormGroup>
          <Button bsStyle='primary' type='submit' block className='save' disabled={this.state.submitDisabled}>Сменить пароль</Button>
        </form>
      </Col>
    </Row>;
  }
}

export default ChangePasswordForm;
