import {PropTypes} from 'react';
import {Nav, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Clock from 'clock';

const AccountDropdown = (props, {user: {image = '/userpic.jpg', status = []}, logout, time}) =>
  <Nav pullRight>
    <Clock />
    <NavDropdown eventKey={1} id='headerDropdown' title={<Image src={image} circle style={{width: '48px'}} />}>
      <LinkContainer to='/profile'><MenuItem>Профиль</MenuItem></LinkContainer>
      {~status.indexOf('admin') && <LinkContainer to='/admin'><MenuItem>Админ</MenuItem></LinkContainer> || null}
      <LinkContainer to='/help'><MenuItem>Помощь</MenuItem></LinkContainer>
      <MenuItem onClick={() => { logout() }}>Выход</MenuItem>
    </NavDropdown>
  </Nav>;

AccountDropdown.contextTypes =  {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default AccountDropdown;
