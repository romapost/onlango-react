import {Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import AccountDropdown from 'accountDropdown';

export default props => <Navbar fluid>
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
