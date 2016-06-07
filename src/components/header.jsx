import React, {PropTypes} from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {IndexLink} from 'react-router';

const {func, object} = PropTypes;

const Header = (props, context) =>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <IndexLink to='/' style={{margin: '1rem'}}>Onlango-react</IndexLink>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavDropdown eventKey={1} id='headerDropdown' title={<Image src={context.userinfo.image} circle style={{width: '48px'}} />}>
          <LinkContainer to='/profile'><MenuItem>Профиль</MenuItem></LinkContainer>
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
