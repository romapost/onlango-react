import React, {PropTypes} from 'react';
import {Nav, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const {func, object} = PropTypes;

const AccountDropdown = (props, context) => <Nav pullRight>
  <NavDropdown eventKey={1} id='headerDropdown' title={<Image src={context.userinfo && context.userinfo.image} circle style={{width: '48px'}} />}>
    <LinkContainer to='/profile'><MenuItem>Профиль</MenuItem></LinkContainer>
    <LinkContainer to='/help'><MenuItem>Помощь</MenuItem></LinkContainer>
    <MenuItem onClick={context.logout}>Выход</MenuItem>
  </NavDropdown>
</Nav>;

AccountDropdown.contextTypes = {
  userinfo: object.isRequired,
  logout: func.isRequired
};

export default AccountDropdown;
