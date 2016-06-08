import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

export default props =>
  <ListGroup fill>
    <IndexLinkContainer to='/dashboard'><ListGroupItem>Главная</ListGroupItem></IndexLinkContainer>
    <LinkContainer to='/schedule'><ListGroupItem>Расписание</ListGroupItem></LinkContainer>
    <LinkContainer to='/payment'><ListGroupItem>Оплата</ListGroupItem></LinkContainer>
    <LinkContainer to='/archive'><ListGroupItem>Архив</ListGroupItem></LinkContainer>
    <LinkContainer to='/tests'><ListGroupItem>Тесты</ListGroupItem></LinkContainer>
    <LinkContainer to='/help'><ListGroupItem>Помощь</ListGroupItem></LinkContainer>
  </ListGroup>;
