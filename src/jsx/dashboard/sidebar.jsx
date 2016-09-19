import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Sidebar = props => <ListGroup fill>
  <LinkContainer to='/dashboard'><ListGroupItem>Главная</ListGroupItem></LinkContainer>
  <LinkContainer to='/schedule'><ListGroupItem>Расписание</ListGroupItem></LinkContainer>
  <LinkContainer to='/teacherslist'><ListGroupItem>Список учитилей</ListGroupItem></LinkContainer>
  <LinkContainer to='/payment'><ListGroupItem>Оплата</ListGroupItem></LinkContainer>
  <LinkContainer to='/archive'><ListGroupItem>Архив</ListGroupItem></LinkContainer>
  <LinkContainer to='/tests'><ListGroupItem>Тесты</ListGroupItem></LinkContainer>
  <LinkContainer to='/help'><ListGroupItem>Помощь</ListGroupItem></LinkContainer>
</ListGroup>;

export default Sidebar;
