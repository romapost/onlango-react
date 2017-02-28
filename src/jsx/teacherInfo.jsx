import React, {Component} from 'react';
import {Row, Col, Panel, Image, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getTeacherInfo} from 'actions';
import {teacherInfo} from 'selectors';
import moment from 'moment';

moment.locale('ru');

class TeacherInfo extends Component {
  componentWillMount() {
    if (this.props.socket.connected) this.props.getTeacherInfo(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.socket.connected && nextProps.socket) this.props.getTeacherInfo(this.props.params.id);
  }
  render() {
    const {experience, languages = [], interests, aboutSelf, country, image, name} = this.props.teacherInfo || {};
    return <Row>
      <Col sm={10} smOffset={1}>
        <Panel className='teacher-info'>
          <h2>{name}</h2>
          <Row>
            <Col sm={3}>
              <Image src={image} rounded className='center-block'/>
              <Button className='center-block'>Записаться на урок</Button>
            </Col>
            <Col sm={4}>
              <p><span className='title'>Стаж преподавания </span>{experience ? moment.duration(experience, 'y').humanize() : 'нет'}</p>
              <p><span className='title'>Страна </span>{country}</p>
              <p><span className='title'>Преподаёт </span>{languages.join(', ')}</p>
              <p><span className='title'>Интересы </span>{interests}</p>
            </Col>
            <Col sm={5}>{aboutSelf}</Col>
          </Row>
        </Panel>
      </Col>
    </Row>;
  }
}

export default connect(
  ({teachers, socket}, ownProps) => ({
    teacherInfo: teacherInfo(teachers, ownProps),
    socket
  }),
  {getTeacherInfo}
)(TeacherInfo);
