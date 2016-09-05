import {Component} from 'react';
import {Row, Col, Panel, Pagination, Image, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {filteredTeachersList, languages} from 'selectors';
import {getTeachersList, filterTeachers} from 'actions';
import moment from 'moment';
import 'locales/ru';

moment.locale('ru');

const TeacherBlock = ({image, name, experience, country, languages, teacherId}) => <LinkContainer to={`/teacherinfo/${teacherId}`}>
  <Col xs={6} sm={4} md={3} className='teacherblock'>
    <Image src={image} circle className='center-block'/>
    <p>{name}</p>
    <p><i className='fa fa-graduation-cap'></i> {moment.duration(experience, 'y').humanize()} <i className='fa fa-map-marker'></i> {country}</p>
  </Col>
</LinkContainer>;

class TecherList extends Component {
  filter = (e) => {
    const {id, selectedIndex} = e.target;
    if (selectedIndex) {
      let {value} = e.target[selectedIndex];
      if (id == 'languages') value = languages[+value];
      this.props.filterTeachers(id, value);
    }
  };
  render() {
    const {list, activePage, totalPages} = this.props.teachersList;
    return <Row>
      <Col sm={10} smOffset={1}>
        <Panel className='teacherlist'>
          <Form horizontal onChange={this.filter}>
            <FormGroup controlId='languages'>
              <Col sm={3} componentClass={ControlLabel}>Фильтр по языку</Col>
              <Col sm={3}>
                <FormControl componentClass='select' value={this.props.language || ''}>
                  <option value=''> Любой язык </option>
                  {this.props.languages.map((e, i) => <option value={i} key={i}>{e}</option>)}
                </FormControl>
              </Col>
            </FormGroup>
          </Form>
          <Row>
            {list.map((e, i) => <TeacherBlock {...e} key={i} />)}
          </Row>
          <Pagination bsSize='medium' items={totalPages} activePage={activePage} onSelect={this.pageSelect} />
        </Panel>
      </Col>
    </Row>;
  }
}

export default connect(({teachers}, ownProps) => ({
  teachersList: filteredTeachersList(teachers, ownProps),
  languages: languages(teachers, ownProps),
  language: teachers.filter.language
}), {getTeachersList, filterTeachers})(TecherList);
