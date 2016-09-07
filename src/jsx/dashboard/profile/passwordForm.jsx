import {Component} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {changePassword} from 'actions';

class ChangePasswordForm extends Component {
  state = {submitDisabled: false};
  changeHandler = e => {
    this[e.target.id] = e.target.value;
    const {password, retype} = this;
    const {retypeWarning, submitDisabled} = this.state;
    const match = (password && (password == retype));
    this.setRetypeWarning(retypeWarning, !match && retype);
    this.setSubmitDisabled(submitDisabled, !match || !retype);
  };
  submitHandler = e => {
    e.preventDefault();
    console.log(this.password);
    this.props.changePassword(this.password);
  };
  setRetypeWarning = (retypeWarning, bool) => {
    if (bool && !retypeWarning) this.setState({retypeWarning: {validationState: 'warning'}});
    else if (!bool && retypeWarning) this.setState({retypeWarning: undefined});
  };
  setSubmitDisabled = (submitDisabled, bool) => {
    if (bool && !submitDisabled) this.setState({submitDisabled: true});
    else if (!bool && submitDisabled) this.setState({submitDisabled: false});
  }
  render() {
    return <Row className='panel' style={{padding: '5rem 2rem'}}>
      <Col sm={4} smOffset={4}>
        <form onChange={this.changeHandler} onSubmit={this.submitHandler}>
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

export default connect(null, {changePassword})(ChangePasswordForm);
