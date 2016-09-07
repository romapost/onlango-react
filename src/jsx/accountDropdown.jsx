import {Nav, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {logout} from 'actions';

const AccountDropdown = ({user: {image}, logout}) => <Nav pullRight>
  <NavDropdown eventKey={1} id='headerDropdown' title={<Image src={image} circle style={{width: '48px'}} />}>
    <LinkContainer to='/profile'><MenuItem>Профиль</MenuItem></LinkContainer>
    <LinkContainer to='/help'><MenuItem>Помощь</MenuItem></LinkContainer>
    <MenuItem onClick={() => { logout() }}>Выход</MenuItem>
  </NavDropdown>
</Nav>;

export default connect(({user}) => ({user}), {logout})(AccountDropdown);
