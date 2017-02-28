import React, {PropTypes} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import AccountDropdown from 'jsx/accountDropdown';

const Brand = ({active, ...props}) => <a href='/' {...props} >Onlango-react</a>;

const MainPage = ({children}, {socket: {authorized}}) => <div className='main-page'>
  <header>
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to='/'><Brand /></LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {authorized ? <AccountDropdown /> : <Nav pullRight>
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
  <div className='content'>{children}</div>
  <footer>
      <Nav>
        <NavItem disabled>© Onlango-react</NavItem>
        <IndexLinkContainer to='/'><NavItem>Home</NavItem></IndexLinkContainer>
        <LinkContainer to='/privacy'><NavItem>Privacy</NavItem></LinkContainer>
      </Nav>
  </footer>
</div>;

MainPage.contextTypes = {
  socket: PropTypes.object
};

export default MainPage;
