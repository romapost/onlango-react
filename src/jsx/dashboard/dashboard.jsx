import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import Header from './header.jsx';
import Sidebar from './sidebar.jsx';
import Entrance, {Login} from 'jsx/entrance';

const Dashboard = ({children}, {socket: {authorized}}) => authorized ? <div id='dashboard'>
  <Header />
  <Row>
    <Col sm={2}>
      <Sidebar />
    </Col>
    <Col sm={10}>
      {children}
    </Col>
  </Row>
</div> : <Entrance><Login /></Entrance>;

Dashboard.contextTypes = {
  socket: PropTypes.object,user: PropTypes.object,
};

export default Dashboard;
