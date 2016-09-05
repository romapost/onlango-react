import {Component} from 'react';
import {Row, Col, Panel, Image, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getTeacherInfo} from 'actions';
import moment from 'moment';
import 'locales/ru';

class TeacherInfo extends Component {
  componentWillMount() {
    const {teacherInfo, getTeacherInfo, params: {teacherId}} = this.props;
    if (!teacherInfo) getTeacherInfo(teacherId);
  }
  render() {
    const {experience, languages, interests, aboutSelf, country, image, name} = this.props.teacherInfo || {};
    return <Row>
      <Col sm={10} smOffset={1}>
        <Panel className='teacher-info'>
        <h2>{name}</h2>
          <Row>
            <Col sm={3}>
              <Image src={image} rounded className='center-block'/>
              <Button className='center-block'>Записаться на урок</Button>
            </Col>
            <Col sm={3}>
              <p><span className='title'>Стаж преподавания </span>{moment.duration(experience, 'y').humanize()}</p>
              <p><span className='title'>Страна </span>{country}</p>
              <p><span className='title'>Преподаёт </span>{languages}</p>
              <p><span className='title'>Интересы </span>{interests}</p>
            </Col>
            <Col sm={6}>{aboutSelf}</Col>
          </Row>
        </Panel>
      </Col>
    </Row>;
  }
}

export default connect(
  ({teachers: {info}}, {params: {teacherId}}) => ({
    teacherInfo: () => info[teacherId]
  }),
  {getTeacherInfo}
)(TeacherInfo);
