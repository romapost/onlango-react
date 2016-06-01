import React from 'react';
import {Image, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

class DateSelector extends React.Component {
  state = {
    days: Array.apply(null, Array(31)).map((e, i) => i + 1),
    mounth: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Ноябрь,Декабрь'.split(','),
    years: Array.apply(null, Array(80)).map((e, i) => i + 1930),
    selected: {
      mounth: 0,
      day: 0,
      year: 70
    }
  };
  render() {
    return <Col sm={6}>
      <ControlLabel>Дата рождения</ControlLabel>
      <Row>
        <Col xs={3}>
          <FormControl componentClass='select'>
            {this.state.days.map((e, i) => <option key={i} value={i}>{e}</option>)}
          </FormControl>
        </Col>
        <Col xs={5}>
          <FormControl componentClass='select' >
            {this.state.mounth.map((e, i) => <option key={i} value={i}>{e}</option>)}
          </FormControl>
        </Col>
        <Col xs={4}>
          <FormControl componentClass='select' defaultValue={this.state.selected.year}>
            {this.state.years.map((e, i) => <option key={i} value={i}>{e}</option>)}
          </FormControl>
        </Col>
      </Row>
    </Col>;
  }
}

const makeInput = ({id, type, label, placeholder, s}) => props => <Col sm={s||6}>
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl type={type || 'text'} placeholder={placeholder || label} defaultValue={props.val}/>
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
      <FormControl componentClass='select'>
        <option value='male'>Мужской</option>
        <option value='female'>Женский</option>
      </FormControl>
    </FormGroup>
  </Col>,
  save: props => <Col sm={3}><Button bsStyle='primary' onClick={props.save} block className='save'>Сохранить</Button></Col>,
  birthdate: DateSelector
};

export default class ProfileEdit extends React.Component{
  static contextTypes = {
    userinfo: React.PropTypes.object,
    uploadImage: React.PropTypes.func,
    accessToken: React.PropTypes.string
  };
  onDrop = ([file]) => { this.context.uploadImage(file, this.context.accessToken) };
  openDropzone = e => { this.refs.dropzone.open() };
  save = e => { console.log(e) };
  render() {
    const {image, name, surname, country, city, birthdate, email, phone, gender, interests} = this.context.userinfo;
    return <Dropzone
      ref='dropzone'
      onDrop={this.onDrop}
      multiple={false}
      disableClick
      className='profile edit navbar-default dropzone container'
      activeClassName='drop-hovered'
    >
      <div className='overlay' />
      <Row>
      <Col md={10} mdOffset={1}>
      <Row className='row-eq-height'>
        <Col sm={3}><Image src={image} circle/></Col>
        <Col sm={3} className='upload-userpic vertical-center'><Button bsStyle='primary' onClick={this.openDropzone}>Загрузить фото</Button></Col>
      </Row>
        <Form>
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
              <inputs.save />
            </Row>
        </Form>
        </Col>
        </Row>
    </Dropzone>;
  }
}
