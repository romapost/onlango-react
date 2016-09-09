import {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Navbar, Nav, NavItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import AccountDropdown from 'accountDropdown';
import {logout} from 'actions';

class MainPage extends Component {
  render() {
    return <div className='main-page'>
      <header>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLinkContainer to='/'><a>Onlango-react</a></IndexLinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.props.accessToken ? <AccountDropdown /> : <Nav pullRight>
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

export default connect(({authorization: {accessToken}}) => ({accessToken}), {logout})(MainPage);
