import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const styles = {
  userpic: {
    width: '48px'
  }
};

export default class Header extends React.Component {
  logout = e => {
    e.preventDefault();
    console.log(this.props.logout);
    this.props.logout();
  }
  render() {
    return <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Onlango-react
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavDropdown eventKey={1} id='nav-dropdown-profile' title={<Image src={this.props.userpic} circle style={styles.userpic} />}>
          <LinkContainer to='/profile'><MenuItem>Профиль</MenuItem></LinkContainer>
          <MenuItem onClick={this.logout}>Выход</MenuItem>

        </NavDropdown>
      </Nav>
    </Navbar>;
  }
}
