import {Component} from 'react';
import {connect} from 'react-redux';
import {connectSocket, getUserInfo} from 'actions';

class App extends Component {
  componentWillMount() {
    this.props.connectSocket('common');
    if (this.props.accessToken) this.props.connectSocket('authorized');
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.accessToken && nextProps.accessToken && !this.props.sockets.authorized) this.props.connectSocket('authorized');
    if (!this.props.sockets.authorized && Object.keys(nextProps.user).length === 0 && nextProps.sockets.authorized) this.props.getUserInfo();
  }
  componentWillUnmount() {
    this.props.disconnectSocket();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect(({authorization: {accessToken}, sockets, user}) => ({accessToken, sockets, user}), {connectSocket, getUserInfo})(App);
