import React, {Component, PropTypes} from 'react';
import {Grid, Navbar, Nav, NavItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import {AccountDropdown} from './lib';

const {object} = PropTypes;

class MainPage extends Component {
  static contextTypes = {
    userinfo: object
  };
  render() {
    return <div className='main-page' ref={c => { this.page = c }}>
      <header>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLinkContainer to='/'><a>Onlango-react</a></IndexLinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.context.userinfo ? <AccountDropdown /> : <Nav pullRight>
              <LinkContainer to='/login'><NavItem>Login</NavItem></LinkContainer>
              <LinkContainer to='/register'><NavItem>Register</NavItem></LinkContainer>
            </Nav>}
            <Nav pullRight={true}>
              <LinkContainer to='/teacherslist'><NavItem>Teachers</NavItem></LinkContainer>
              <LinkContainer to='/dashboard'><NavItem>Dashboard</NavItem></LinkContainer>
              <LinkContainer to='/about'><NavItem>About</NavItem></LinkContainer>
              <LinkContainer to='/contact'><NavItem>Contact</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <Grid fluid>
        {this.props.children}
      </Grid>
      <footer>
          <Nav>
            <NavItem disabled>© Onlango-react</NavItem>
            <IndexLinkContainer to='/'><NavItem>Home</NavItem></IndexLinkContainer>
            <LinkContainer to='/privacy'><NavItem>Privacy</NavItem></LinkContainer>
          </Nav>
      </footer>
    </div>;
  }
}

export default MainPage;
