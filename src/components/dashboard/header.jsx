import React from 'react';
import {Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {AccountDropdown} from '../lib';

const Header = (props, context) => <Navbar fluid>
  <Navbar.Header>
    <Navbar.Brand>
      <LinkContainer to='/' style={{margin: '1rem'}}><a>Onlango-react</a></LinkContainer>
    </Navbar.Brand>
    <Navbar.Toggle style={{marginTop: '1.5rem'}} />
  </Navbar.Header>
  <Navbar.Collapse>
    <AccountDropdown />
  </Navbar.Collapse>
</Navbar>;

export default Header;
