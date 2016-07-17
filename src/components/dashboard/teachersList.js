import React, {Component} from 'react';
import {Row, Col, Panel, Pagination, Image, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const languages = ['English', 'German', 'Italian', 'Spanish', 'French'];

function makeTeacher(n){
  return {
    name: `Name${n}`,
    expeerence: Math.round(Math.random() * 10),
    country: `Country${Math.round(Math.random() * 10)}`,
    image: 'userpic.jpg',
    language: languages[Math.floor(Math.random() * languages.length)]
  };
}

function applyFilter(filter = {}, list = []) {
  const names = Object.keys(filter);
  return list.filter(e => {
    for (let name of names) {
      if (e[name] !== filter[name]) return false;
    }
    return true;
  });
}

const TeacherBlock = ({image, name, expeerence, country, language}) => <Col xs={6} sm={4} md={3}>
  <Image src={image} circle className='center-block'/>
  <p>{name}</p>
  <p>{expeerence} лет {country}</p>
  <p>{language}</p>
</Col>;

export default class TecherList extends Component {
  state = {
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
      if (id == 'language') value = languages[+value];
      this.filters[id] = value;
    }
    const update = {list: applyFilter(this.filters, this.teachers)};
    const maxPage = Math.ceil(update.list.length / this.state.blocksOnPage);
    if (this.state.activePage > maxPage) update.activePage = maxPage;
    this.setState(update);
  };
  componentWillMount() {
    this.teachers = Array.apply(null, Array(200)).map((e, i) => makeTeacher(i));
    this.setState({list: this.teachers});
  }
  render() {
    const {activePage: p, blocksOnPage: n} = this.state;
    console.log(n, p);
    const pagesNamber = Math.ceil(this.state.list.length / n);
    const list = this.state.list
      .slice((p - 1) * n, p * n)
      .map((e, i) => <TeacherBlock {...e} key={i} />);
    return <Row>
        <Col sm={12}>
          <Panel>
            <Form horizontal onChange={this.filter}>
              <FormGroup controlId='language'>
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
