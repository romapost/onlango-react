import React, {Component} from 'react';
import {Row, Col, Panel, Image, Button} from 'react-bootstrap';
import request from 'superagent';
import moment from 'moment';
import '../locales/ru';

export default class TeacherInfo extends Component {
  state = {};
  componentDidMount() {
    request
      .get(`/api/teacherinfo/${this.props.params.teacherId}`)
      .end((err, res) => {
        if (!err && res) this.setState(res.body);
      });
  }
  render() {
    const {teacherForm: {experience, languages, interests, aboutSelf} = {}, userinfo: {country} = {}} = this.state;
    return <Row>
      <Col sm={10} smOffset={1}>
        <Panel className='teacherinfo'>
          <Row>
            <Col sm={3}>
              <Image src={`/${this.state.image}`} rounded className='center-block'/>
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
