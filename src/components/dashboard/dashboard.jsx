import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './header.jsx';
import Sidebar from './sidebar.jsx';

const {func, string} = PropTypes;

class Dashboard extends Component {
  static contextTypes = {
    getUserinfo: func,
    accessToken: string
  };
  componentWillMount() {
    this.context.getUserinfo(this.context.accessToken);
  }
  render() {
    return <div id='dashboard'>
      <Header />
      <Grid fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    </div>;
  }
}

export default Dashboard;
