import React, {Component, PropTypes} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Radio, Panel, HelpBlock, Button} from 'react-bootstrap';
import request from 'superagent';

const languages = ['English', 'German', 'Italian', 'Spanish', 'French'];
const ages = ['6 месяцев', '1 год',  '2 года', '3 года', '5 лет'];
const weekHours = ['0 до 10', 'от 10 до 20', 'от 20 до 30', 'от 30 до 40'];
const dayHours = ['с 5 до 8', 'с 9 до 19', 'с 19 до 24', 'с 0 до 5'];
const dayHoursLabels = ['утро', 'день', 'вечер', 'ночь'];
const rows = ['Понедельниr - Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const DoubleCol = props => <Row>{props.children.map((child, i) => <Col sm={6} key={i}>{child}</Col>)}</Row>;

const Experience = props => <Panel header='1. Мой опыт'>
  <DoubleCol>
    <FormGroup controlId='languages'>
      <Row>
        <Col sm={7}>
          <ControlLabel>Язык который хочу предоподовать</ControlLabel>
        </Col>
        <Col sm={5}>
          <FormControl componentClass='select' multiple>
            {languages.map((e, i) => <option value={e} key={i}>{e}</option>)}
          </FormControl>
        </Col>
      </Row>
    </FormGroup>
    <FormGroup controlId='experience'>
      <Col sm={7}>
        <ControlLabel>Стаж предоподавания</ControlLabel>
      </Col>
      <Col sm={5}>
        <FormControl componentClass='select'>
          <option value=''> - </option>
          {ages.map((e, i) => <option value={i} key={i}>{e}</option>)}
        </FormControl>
      </Col>
    </FormGroup>
  </DoubleCol>
  <DoubleCol>
    <FormGroup controlId='experienceOnline'>
    <Row>
      <Col sm={7}><ControlLabel>Есть ли опыт преподавания онлайн?</ControlLabel></Col>
      <Col sm={2}><Radio inline name='experienceOnline' value='yes'>Есть</Radio></Col>
      <Col sm={2}><Radio inline name='experienceOnline' value='no'>Нет</Radio></Col>
      </Row>
    </FormGroup>
    <FormGroup controlId='hoursCanTeach'>
      <Col sm={7}>
        <ControlLabel>Сколько часов в неделю можете преподавать?</ControlLabel>
      </Col>
      <Col sm={5}>
        <FormControl componentClass='select'>
          <option value=''> - </option>
          {weekHours.map((e, i) => <option value={i} key={i}>{e}</option>)}
        </FormControl>
      </Col>
    </FormGroup>
  </DoubleCol>
</Panel>;

const Schedule = props => <Panel header='2. Расписание'>
  <Row>
    <Col>
      <table className='schedule'>
        <thead ><tr><th />{dayHours.map((e, i) => <th key={i}>{e}<br />{dayHoursLabels[i]}</th>)}</tr></thead>
        <tbody>{rows.map((rowTitle, r) => <tr key={`r${r}`}>
          <td>{rowTitle}</td>{dayHours.map((e, c) => {
            const i = `r${r}c${c}`;
            return <td key={i}><input type='checkbox' id={i} /><label htmlFor={i}><div /></label></td>;
          })}
        </tr>)}</tbody>
      </table>
    </Col>
  </Row>
</Panel>;

const About = props => <Panel header='3. О себе'>
  <FormGroup controlId='aboutSelf'>
    <ControlLabel>Расскажите о себе</ControlLabel>
    <FormControl componentClass='textarea' />
  </FormGroup>
  <FormGroup controlId='resumeFile'>
    <ControlLabel>Прикрепить резюме</ControlLabel>
    <FormControl type='file' />
    <HelpBlock>Файл в формате PDF, MS WORD, TXT</HelpBlock>
  </FormGroup>
</Panel>;

const Contacts = props => <Panel header='4. Контактная информация'>
  <FormGroup controlId='address'>
    <ControlLabel>Адрес</ControlLabel>
    <FormGroup controlId='street'><FormControl type='text' placeholder='Street address 1'/></FormGroup>
    <FormGroup controlId='street2'><FormControl type='text' placeholder='Street address 2 (optional)'/></FormGroup>
  </FormGroup>
  <DoubleCol>
    <FormGroup controlId='zipcode'><FormControl type='text' placeholder='Zip code'/></FormGroup>
    <FormGroup controlId='city'><FormControl type='text' placeholder='City'/></FormGroup>
  </DoubleCol>
  <DoubleCol>
    <FormGroup controlId='state'><FormControl type='text' placeholder='State'/></FormGroup>
    <FormGroup controlId='country'><FormControl type='text' placeholder='Coutry'/></FormGroup>
  </DoubleCol>
  <DoubleCol>
    <FormGroup controlId='phone'><FormControl type='tel' placeholder='Phone'/></FormGroup>
    <FormGroup controlId='skype'><FormControl type='text' placeholder='Skype'/></FormGroup>
  </DoubleCol>
</Panel>;

class TeacherForm extends Component {
  static contextTypes = {accessToken: PropTypes.string};
  state = {
    data: 'languages,experience,experienceOnline,hoursCanTeach,schedule,aboutSelf,street,street2,zipcode,city,state,country,phone,skype'
      .split(',')
      .reduce((s, e) => ({...s, [e]: null}), {}),
    submitDisabled: true,
    optional: ['street2', 'schedule'],
    resumeFile: null
  };
  change = e => {
    let {id, value, type} = e.target;
    if (type == 'file') this.setState({resumeFile: e.target.files[0]}, this.validate);
    else {
      if (type == 'radio') id = 'experienceOnline';
      else if (type == 'checkbox') {
        id = 'schedule';
        value = 'stub';
      }
      this.setState({data: {...this.state.data, [id]: value}}, this.validate);
    }
  };
  submit = e => {
    e.preventDefault();
    request
      .post('/api/teacherform')
      .set('Authorization', `Bearer ${this.context.accessToken}`)
      .send(this.state.data)
      .end((err, res) => {
        console.log(err, res);
      });
    if (this.state.resumeFile) request
      .post('/api/teacherform/resumeFile')
      .set('Authorization', `Bearer ${this.context.accessToken}`)
      .attach('resumeFile', this.state.resumeFile)
      .end((err, res) => {
        console.log(err, res);
      });
  };
  validate() {
    const {submitDisabled} = this.state;
    const isCompleted = Object
      .keys(this.state.data)
      .filter(e => this.state.optional.indexOf(e) === -1)
      .every(e => this.state.data[e]);
    if (isCompleted && submitDisabled) this.setState({submitDisabled: false});
    else if (!isCompleted && !submitDisabled) this.setState({submitDisabled: true});
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState);
    if (this.state.submitDisabled !== nextState.submitDisabled) return true;
    return false;
  }
  render() {
    console.log(this.state);
    return <Panel className='become-teacher'>
      <form onChange={this.change} onSubmit={this.submit}>
        <Experience />
        <Schedule />
        <About />
        <Contacts />
        <Row><Col sm={4} smOffset={4}><Button type='submit' block bsStyle='primary' disabled={this.state.submitDisabled}>Отправить</Button></Col></Row>
      </form>
    </Panel>;
  }
}

export default TeacherForm;
