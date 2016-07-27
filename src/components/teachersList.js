import React, {Component} from 'react';
import {Row, Col, Panel, Pagination, Image, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import request from 'superagent';
import moment from 'moment';
import '../locales/ru';

moment.locale('ru');
const languages = ['English', 'German', 'Italian', 'Spanish', 'French'];

function applyFilter(filter = {}, list = []) {
  const names = Object.keys(filter);
  console.log(list);
  return list.filter(e => {
    console.log(e);
    for (let name of names) {
      console.log(name, e[name]);
      if (Array.isArray(e[name])) {
        if (e[name].indexOf(filter[name]) === -1) return false;
      } else if (e[name] !== filter[name]) return false;
    }
    return true;
  });
}

const TeacherBlock = ({image, name, experience, country, languages, teacherId}) => <LinkContainer to={`/teacherinfo/${teacherId}`}>
  <Col xs={6} sm={4} md={3} className='teacherblock'>
    <Image src={image} circle className='center-block'/>
    <p>{name}</p>
    <p><i className='fa fa-graduation-cap'></i> {moment.duration(experience, 'y').humanize()} <i className='fa fa-map-marker'></i> {country}</p>
  </Col>
</LinkContainer>;

export default class TecherList extends Component {
  state = {
    fullList: [],
    list: [],
    filters: {},
    blocksOnPage: 12,
    activePage: 1
  };
  filters = {};
  pageSelect = (p, e) => {
    this.setState({activePage: p});
  };
  filter = (e) => {
    const {id, selectedIndex} = e.target;
    if (!selectedIndex) delete this.filters[id];
    else {
      let {value} = e.target[selectedIndex];
      if (id == 'languages') value = languages[+value];
      this.filters[id] = value;
    }
    const update = {list: applyFilter(this.filters, this.state.fullList)};
    const maxPage = Math.ceil(update.list.length / this.state.blocksOnPage);
    if (this.state.activePage > maxPage) update.activePage = maxPage;
    this.setState(update);
  };
  componentDidMount() {
    request
      .get('/api/teacherslist')
      .end((err, res) => {
        console.log(res.body);
        if (!err && res) this.setState({fullList: [...res.body], list: [...res.body]});
      });
  }
  render() {
    const {activePage: p, blocksOnPage: n} = this.state;
    const pagesNamber = Math.ceil(this.state.list.length / n);
    const list = this.state.list
      .slice((p - 1) * n, p * n)
      .map((e, i) => <TeacherBlock {...e} key={i} />);
    return <Row>
      <Col sm={10} smOffset={1}>
        <Panel className='teacherlist'>
          <Form horizontal onChange={this.filter}>
            <FormGroup controlId='languages'>
              <Col sm={3} componentClass={ControlLabel}>Фильтр по языку</Col>
              <Col sm={3}>
                <FormControl componentClass='select' value={this.state.filters.language}>
                  <option value=''> Любой язык </option>
                  {languages.map((e, i) => <option value={i} key={i}>{e}</option>)}
                </FormControl>
              </Col>
            </FormGroup>
          </Form>
          <Row>
            {list}
          </Row>
          <Pagination bsSize='medium' items={pagesNamber} activePage={this.state.activePage} onSelect={this.pageSelect} />
        </Panel>
      </Col>
    </Row>;
  }
}
