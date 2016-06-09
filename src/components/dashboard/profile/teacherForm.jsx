import React, {Component} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Radio, Panel, HelpBlock, Button} from 'react-bootstrap';

const languages = ['English', 'German', 'Italian', 'Spanish', 'French'];
const ages = ['6 месяцев', '1 год',  '2 года', '3 года', '5 лет'];
const weekHours = ['0 до 10', 'от 10 до 20', 'от 20 до 30', 'от 30 до 40'];
const dayHours = ['с 5 до 8', 'с 9 до 19', 'с 19 до 24', 'с 0 до 5'];
const dayHoursLabels = ['утро', 'день', 'вечер', 'ночь'];
const rows = ['Понедельниr - Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const DoubleCol = props => <Row>{props.children.map((child, i) => <Col sm={6} key={i}>{child}</Col>)}</Row>;

const Experience = props => <Panel header='1. Мой опыт'>
  <DoubleCol>
    <FormGroup controlId='language'>
      <Row>
        <Col sm={7}>
          <ControlLabel>Язык который хочу предоподовать</ControlLabel>
        </Col>
        <Col sm={5}>
          <FormControl componentClass='select' name='language' multiple>
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
        <FormControl componentClass='select' name='experience'>
          {ages.map((e, i) => <option value={i} key={i}>{e}</option>)}
        </FormControl>
      </Col>
    </FormGroup>
  </DoubleCol>
  <DoubleCol>
    <FormGroup controlId='exponline'>
    <Row>
      <Col sm={7}><ControlLabel>Есть ли опыт преподавания онлайн?</ControlLabel></Col>
      <Col sm={2}><Radio inline name='exponline'>Есть</Radio></Col>
      <Col sm={2}><Radio inline name='exponline'>Нет</Radio></Col>
      </Row>
    </FormGroup>
    <FormGroup controlId='hours'>
      <Col sm={7}>
        <ControlLabel>Сколько часов в неделю можете преподавать?</ControlLabel>
      </Col>
      <Col sm={5}>
        <FormControl componentClass='select' name='hours'>
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
  <FormGroup controlId='aboutself'>
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
    <FormGroup controlId='skype'><FormControl type='text' placeholder='Skipe'/></FormGroup>
  </DoubleCol>
</Panel>;

class TeacherForm extends Component {
  state = {};
  submit = e => {
    e.preventDefault();
  };
  render() {
    return <Panel className='become-teacher'>
      <form onSubmit={this.submit}>
        <Experience />
        <Schedule />
        <About />
        <Contacts />
        <Row><Col sm={4} smOffset={4}><Button type='submit' block bsStyle='primary'>Отправить</Button></Col></Row>
      </form>
    </Panel>;
  }
}

export default TeacherForm;
