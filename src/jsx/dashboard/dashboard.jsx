import {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './header.jsx';
import Sidebar from './sidebar.jsx';
import io from 'socket.io-client';
import {host} from 'config';
import {connectSocket, disconnectSocket, getUserInfo} from 'actions';
import {withRouter} from 'react-router';


class Dashboard extends Component {
  componentWillMount() {
    console.log('willMount', this.props);
    if (!this.props.accessToken) this.props.router.push('/login');
    else {
      const socket = io(`${host}/authorized`, {path: '/api'});
      this.props.connectSocket({name: 'authorized', socket});
    }
  }
  componentWillUnmount() {
    this.props.disconnectSocket('authorized');
  }
  componentWillReceiveProps(nextProps) {
    console.log('receiveProps', this.props, this.props.user.name);
    if (!nextProps.accessToken) this.props.router.push('/login');
    if (nextProps.authorizedSocket && !('name' in nextProps.user)) this.props.getUserInfo();
  }
  render() {
    return <div id='dashboard'>
      <Header />
      <Grid fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    </div>;
  }
}

export default connect(
  ({authorization: {accessToken}, sockets: {authorized: authorizedSocket}, user}) => ({accessToken, authorizedSocket, user}),
  {connectSocket, disconnectSocket, getUserInfo}
)(withRouter(Dashboard));
