import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import Sidebar from './sidebar';
import {Header} from 'jsx/dashboard';

const Admin = ({children}, {router, user: {id, status = []}}) => {
  if (!id) {
    return null;
  } else if (status.indexOf('admin')) {
    router.push('/');
    return null;
  } else {
    return <Row id="admin">
      <Header />
      <Col sm={2}>
        <Sidebar />
      </Col>
      <Col sm={10}>
        {children}
      </Col>
    </Row>;
  }
};

Admin.contextTypes = {
  user: PropTypes.object,
  router: PropTypes.object
};

export default Admin;
