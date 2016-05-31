import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const styles = {
  userpic: {
    width: '48px'
  }
};

const Header = (props, context) =>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        Onlango-react
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <NavDropdown eventKey={1} id='nav-dropdown-profile' title={<Image src={context.userinfo.image} circle style={styles.userpic} />}>
        <LinkContainer to='/profile'><MenuItem>Профиль</MenuItem></LinkContainer>
        <MenuItem onClick={context.logout}>Выход</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>;

Header.contextTypes = {
  userinfo: React.PropTypes.object,
  logout: React.PropTypes.func
};
export default Header;
