import React from 'react';
import {Image, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

class DateSelector extends React.Component {
  state = {
    months: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь'.split(','),
    years: Array.apply(null, Array(100)).map((e, i) => i + 1930)
  };
  composeDays = ({month = 0, year = 2000}) => {
    const amount = (new Date(year, month + 1, 0)).getDate();
    this.setState({days: Array.apply(null, Array(amount)).map((e, i) => i + 1)});
  };
  componentWillMount() {
    this.composeDays(this.props);
  }
  componentWillReceiveProps(nextProps, nextState, nextContext) {
    if (nextProps.month != this.props.month || nextProps.year != this.props.year)
      this.composeDays(nextProps);
  }
  render() {
    const {day, month, year} = this.props;
    const d = <option>-</option>;
    return <Col sm={6}>
      <FormGroup>
        <ControlLabel>Дата рождения</ControlLabel>
        <Row>
          <Col sm={3}><FormControl id='day' name='day' componentClass='select' value={day}>
            {d}{this.state.days.map((e, i) => <option key={i} value={e}>{e}</option>)}
          </FormControl></Col>
          <Col sm={5}><FormControl id='mounth' name='month' componentClass='select' value={month}>
            {d}{this.state.months.map((e, i) => <option key={i} value={i}>{e}</option>)}
          </FormControl></Col>
          <Col sm={4}><FormControl id='year' name='year' componentClass='select' value={year}>
            {d}{this.state.years.map((e, i) => <option key={i} value={e}>{e}</option>)}
          </FormControl></Col>
        </Row>
      </FormGroup>
    </Col>;
  }
}

const GenderSelector = props => <Col sm={props.size||6}>
  <FormGroup controlId={props.id}>
    <ControlLabel>{props.label}</ControlLabel>
    <FormControl componentClass='select' name={props.id} value={props.value}>
      <option>-</option>
      <option value='male'>Мужской</option>
      <option value='female'>Женский</option>
    </FormControl>
  </FormGroup>
</Col>;

const Input = props => <Col sm={props.size||6}>
  <FormGroup controlId={props.id}>
    <ControlLabel>{props.label}</ControlLabel>
    <FormControl type={props.type || 'text'} name={props.id} placeholder={props.placeholder || props.label} value={props.value} />
  </FormGroup>
</Col>;

export default class ProfileEdit extends React.Component{
  static contextTypes = {
    userinfo: React.PropTypes.object,
    uploadImage: React.PropTypes.func,
    uploadUserinfo: React.PropTypes.func,
    accessToken: React.PropTypes.string
  };
  state = {...this.context.userinfo};
  drop = ([file]) => { this.context.uploadImage(file, this.context.accessToken) };
  open = e => { this.refs.dropzone.open() };
  submit = e => {
    e.preventDefault();
    const data = this.state;
    this.context.uploadUserinfo(data, this.context.accessToken);
  };
  change = e => {
    const {name, value} = e.target;
    if (name == 'day' || name == 'month' || name == 'year') {
      this.setState({[name]: value == '-' ? undefined : +value});
    } else if (name == 'gender') {
      this.setState({gender: value == '-' ? undefined : value});
    } else {
      this.setState({[name]: value});
    }
  };
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({...this.state, ...nextContext.userinfo});
  }
  render() {
    const {image, name, surname, country, city, email, phone, gender, interests, day, month, year} = this.state;
    const birthdate = {day, month, year};

    return <Dropzone
      ref='dropzone'
      onDrop={this.drop}
      multiple={false}
      disableClick
      className='profile edit navbar-default dropzone container'
      activeClassName='drop-hovered'>
      <div className='overlay' />
      <Row>
        <Col md={10} mdOffset={1}>
          <Row>
            <Image src={image} style={{margin: '2rem'}} circle/>
            <Button bsStyle='primary' onClick={this.open}>Загрузить фото</Button>
          </Row>
          <Form onChange={this.change} onSubmit={this.submit}>
            <Row>
              <Input id='name' label='Имя' value={name} />
              <Input id='email' type='email' label='Email' value={email} />
            </Row>
            <Row>
              <Input id='surname' label='Фамилия' value={surname} />
              <Input id='phone' type='tel' label='Телефон' value={phone} />
            </Row>
            <Row>
              <GenderSelector id='gender' label='Пол' value={gender}/>
              <Input id='country' label='Страна' value={country} />
            </Row>
            <Row>
              <DateSelector {...birthdate} />
              <Input id='city' label='Город' value={city} />
            </Row>
            <Row>
              <Input id='interests' label='Интересы' value={interests} size={12} />
            </Row>
            <Row>
              <Col sm={3}><Button bsStyle='primary' type='submit' block className='save'>Сохранить</Button></Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Dropzone>;
  }
}
