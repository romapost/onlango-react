import {Component} from 'react';
import {Image, Panel, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

class DateSelector extends Component {
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
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.month != this.props.month || nextProps.year != this.props.year)
      this.composeDays(nextProps);
  }
  render() {
    const {day, month, year} = this.props;
    const d = <option>-</option>;
    return <Panel>
      <Col sm={6}>
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
      </Col>
    </Panel>;
  }
}

const GenderSelector = ({id, label, value = '', size = 6}) => <Col sm={size}>
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass='select' name={id} value={value}>
      <option value=''>-</option>
      <option value='male'>Мужской</option>
      <option value='female'>Женский</option>
    </FormControl>
  </FormGroup>
</Col>;

const Input = ({id, label, placeholder = label, type = 'text', value = '', size = 6}) => <Col sm={size}>
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl type={type} name={id} placeholder={placeholder} value={value} />
  </FormGroup>
</Col>;

class EditForm extends Component{
  dropHandler = ([file]) => {
    if (!file) return;
    this.props.uploadUserImage({type: file.type, file});
  };
  openHandler = e => { this.refs.dropzone.open() };
  submitHandler = e => {
    e.preventDefault();
    this.props.submitUserInfo(this.props.user);
  };
  changeHandler = e => {
    const {name, value} = e.target;
    const change = {};
    if (name == 'day' || name == 'month' || name == 'year') {
      change[name] = value == '-' ? undefined : +value;
    } else if (name == 'gender') {
      change.gender = value == '-' ? undefined : value;
    } else {
      change[name] = value;
    }
    this.props.editUserInfo({...this.props.user, ...change});
  };
  render() {
    const {image, name, surname, country, city, email, phone, gender, interests, day, month, year} = this.props.user;
    const birthdate = {day, month, year};

    return <Dropzone
      ref='dropzone'
      onDrop={this.dropHandler}
      multiple={false}
      disableClick
      className='profile edit navbar-default dropzone'
      activeClassName='drop-hovered'>
      <div className='overlay' />

      <Row>
        <Col md={10} mdOffset={1}>
          <Row>
            <Image src={image} style={{margin: '2rem', width: '10rem'}} circle/>
            <Button bsStyle='primary' onClick={this.openHandler}>Загрузить фото</Button>
          </Row>
          <Form onChange={this.changeHandler} onSubmit={this.submitHandler}>
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

export default EditForm;
