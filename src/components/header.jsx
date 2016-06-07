import React, {PropTypes} from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

const {func, object} = PropTypes;

const Header = (props, context) =>
  <Navbar>
    <Navbar.Header>
        <Navbar.Brand><IndexLinkContainer to='/' style={{margin: '1rem'}}><a>Onlango-react</a></IndexLinkContainer></Navbar.Brand>

    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavDropdown eventKey={1} id='headerDropdown' title={<Image src={context.userinfo && context.userinfo.image} circle style={{width: '48px'}} />}>
          <LinkContainer to='/profile'><MenuItem>Профиль</MenuItem></LinkContainer>
          <LinkContainer to='/help'><MenuItem>Помощь</MenuItem></LinkContainer>
          <MenuItem onClick={context.logout}>Выход</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

Header.contextTypes = {
  userinfo: object.isRequired,
  logout: func.isRequired
};

export default Header;
