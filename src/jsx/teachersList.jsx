import React, {Component} from 'react';
import {Row, Col, Panel, Pagination, Image, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {filteredTeachersList, languages} from 'selectors';
import {getTeachersList, filterTeachers, setTeachersListPage} from 'actions';
import moment from 'moment';

moment.locale('ru');

const TeacherBlock = ({id, image, name, experience, country, languages}) => <LinkContainer to={`/teacherinfo/${id}`}>
  <Col xs={6} sm={4} md={3} className='teacherblock'>
    <Image src={image} circle className='center-block'/>
    <p>{name}</p>
    <p><i className='fa fa-graduation-cap'></i> {experience ? moment.duration(experience, 'y').humanize() : 'нет'} <i className='fa fa-map-marker'></i> {country}</p>
  </Col>
</LinkContainer>;

class TecherList extends Component {
  filter = (e) => {
    const {id, selectedIndex} = e.target;
    if (typeof selectedIndex !== 'undefined') {
      const {value} = e.target[selectedIndex];
      this.props.filterTeachers({id, value});
    }
  };
  componentWillMount() {
    if (this.props.socket.connected) {
      this.props.getTeachersList();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.socket.connected && nextProps.socket.connected) {
      this.props.getTeachersList();
    }
  }
  render() {
    const {list, activePage, totalPages} = this.props.list;
    return <Row>
      <Col sm={10} smOffset={1}>
        <Panel className='teacherlist'>
          <Form horizontal onChange={this.filter}>
            <FormGroup controlId='languages'>
              <Col sm={3} componentClass={ControlLabel}>Фильтр по языку</Col>
              <Col sm={3}>
                <FormControl componentClass='select' value={this.props.language || ''}>
                  <option value=''> Любой язык </option>
                  {this.props.languages.map((e, i) => <option value={e} key={i}>{e}</option>)}
                </FormControl>
              </Col>
            </FormGroup>
          </Form>
          <Row>
            {list.map((e, i) => <TeacherBlock {...e} key={i} />)}
          </Row>
          <Pagination bsSize='medium' items={totalPages} activePage={activePage} onSelect={this.props.setTeachersListPage} />
        </Panel>
      </Col>
    </Row>;
  }
}

export default connect(({teachers, socket}, ownProps) => ({
  list: filteredTeachersList(teachers, ownProps),
  languages: languages(teachers, ownProps),
  language: teachers.filter.languages,
  socket
}), {getTeachersList, filterTeachers, setTeachersListPage})(TecherList);
