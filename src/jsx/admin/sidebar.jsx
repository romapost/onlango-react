import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Sidebar = props => <ListGroup fill>
  <LinkContainer to='/admin/rooms'><ListGroupItem>Комнаты</ListGroupItem></LinkContainer>
</ListGroup>;

export default Sidebar;
