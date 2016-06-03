import React from 'react';
import {findDOMNode} from 'react-dom';
import {Image, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

class DateSelector extends React.Component {
  state = {
    days: Array.apply(null, Array(31)).map((e, i) => i + 1),
    months: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Ноябрь,Декабрь'.split(','),
    years: Array.apply(null, Array(100)).map((e, i) => i + 1930),
    selected: this.props.date ? {
      day: this.props.date.getDate(),
      month: this.props.date.getMonth(),
      year: this.props.date.getFullYear()
    } : {day: -1, month: -1, year: -1},
    date: this.props.date
  };
  composeDays = (month, year) => {
    const amount = (new Date(year, month + 1, 0)).getDate();
    this.setState({days: Array.apply(null, Array(amount)).map((e, i) => i + 1)});
  };
  change = e => {
    const [day = 1, month = 0, year = 2000] = [+this.day.value, +this.month.value, +this.year.value];
    const selected = {day, month, year};
    this.composeDays(month, year);
    this.setState({selected, date: new Date(year, month, day)});
  };
  render() {
    const d = <option disabled value='-1'>-</option>;
    return <Col sm={6}>
      <FormGroup onChange={this.change}>
        <ControlLabel>Дата рождения</ControlLabel>
          <Row>
            <Col sm={3}><FormControl id='day' componentClass='select' ref={c => this.day = findDOMNode(c)} defaultValue={this.state.selected.day || -1}>
              {d}{this.state.days.map((e, i) => <option key={i} value={e}>{e}</option>)}
            </FormControl></Col>
            <Col sm={5}><FormControl id='mounth' componentClass='select' ref={c => this.month = findDOMNode(c)} defaultValue={this.state.selected.month || -1}>
              {d}{this.state.months.map((e, i) => <option key={i} value={i}>{e}</option>)}
            </FormControl></Col>
            <Col sm={4}><FormControl id='year' componentClass='select' ref={c => this.year = findDOMNode(c)} defaultValue={this.state.selected.year || -1}>
              {d}{this.state.years.map((e, i) => <option key={i} value={e}>{e}</option>)}
            </FormControl></Col>
          </Row>
      </FormGroup>
      <input type='text' name='date' value={this.state.date || ''} hidden readOnly />
    </Col>;
  }
}

const makeInput = ({id, type, label, placeholder, s}) => props => <Col sm={s||6}>
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl type={type || 'text'} name={id} placeholder={placeholder || label} defaultValue={props.val}/>
  </FormGroup>
</Col>;

const inputs = {
  name: makeInput({id: 'name', label: 'Имя'}),
  surname: makeInput({id: 'surname', label: 'Фамилия'}),
  email: makeInput({id: 'email', type: 'email', label: 'Email'}),
  phone: makeInput({id: 'phone', type: 'tel', label: 'Телефон'}),
  country: makeInput({id: 'country', label: 'Страна'}),
  city: makeInput({id: 'city', label: 'Город'}),
  interests: makeInput({id: 'interests', label: 'Интересы', s: 12}),
  gender: props => <Col sm={6}>
    <FormGroup controlId='gender'>
      <ControlLabel>Пол</ControlLabel>
      <FormControl componentClass='select' name='gender' defaultValue='none'>
        <option disabled value='none'>-</option>
        <option value='male'>Мужской</option>
        <option value='female'>Женский</option>
      </FormControl>
    </FormGroup>
  </Col>,
  save: props => <Col sm={3}><Button bsStyle='primary' type='submit' form={props.form} block className='save'>Сохранить</Button></Col>,
  birthdate: DateSelector
};

export default class ProfileEdit extends React.Component{
  static contextTypes = {
    userinfo: React.PropTypes.object,
    uploadImage: React.PropTypes.func,
    uploadUserinfo: React.PropTypes.func,
    accessToken: React.PropTypes.string
  };
  drop = ([file]) => { this.context.uploadImage(file, this.context.accessToken) };
  open = e => { this.refs.dropzone.open() };
  submit = e => {
    e.preventDefault();
    const data = Array.from(new FormData(this.form)).filter(e => e[1]).reduce((s, e) => ({...s, [e[0]]: e[1]}), {});
    this.context.uploadUserinfo(data, this.context.accessToken);
  };
  change = e => {  };
  render() {
    const formId = 'userinfoEdit';
    const style = {
      userpic: {margin: '2rem'}
    };
    const {image, name, surname, country, city, birthdate, email, phone, gender, interests} = this.context.userinfo;
    return <Dropzone
      ref='dropzone'
      onDrop={this.drop}
      multiple={false}
      disableClick
      className='profile edit navbar-default dropzone container'
      activeClassName='drop-hovered'
    >
      <div className='overlay' />
      <Row>
      <Col md={10} mdOffset={1}>
      <Row>
        <Image src={image} style={style.userpic} circle/>
        <Button bsStyle='primary' onClick={this.open}>Загрузить фото</Button>
      </Row>
        <Form onChange={this.change} onSubmit={this.submit} id={formId} ref={(form) => this.form = findDOMNode(form)}>
            <Row>
              <inputs.name val={name}/>
              <inputs.email val={email} />
            </Row>
            <Row>
              <inputs.surname val={surname}/>
              <inputs.phone val={phone}/>
            </Row>
            <Row>
              <inputs.gender val={gender}/>
              <inputs.country val={country}/>
            </Row>
            <Row>
              <inputs.birthdate val={birthdate}/>
              <inputs.city val={city}/>
            </Row>
            <Row>
              <inputs.interests val={(interests||[]).join(', ')}/>
            </Row>
            <Row>
              <inputs.save form={formId}/>
            </Row>
        </Form>
        </Col>
        </Row>
    </Dropzone>;
  }
}
