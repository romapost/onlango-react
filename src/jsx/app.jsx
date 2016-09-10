import {Component} from 'react';
import {connect} from 'react-redux';
import {connectSocket, disconnectSocket, getUserInfo} from 'actions';

class App extends Component {
  componentWillMount() {
    this.props.connectSocket('common');
    if (this.props.accessToken) this.props.connectSocket('authorized');
  }
  componentWillReceiveProps(nextProps) {
    const {accessToken, sockets, connectSocket, disconnectSocket, getUserInfo} = this.props;
    if (!accessToken && nextProps.accessToken && !sockets.authorized) connectSocket('authorized');
    if (accessToken && !nextProps.accessToken && sockets.authorized) disconnectSocket('authorized');
    if (!sockets.authorized && Object.keys(nextProps.user).length === 0 && nextProps.sockets.authorized) getUserInfo();
  }
  componentWillUnmount() {
    this.props.disconnectSocket();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect(({authorization: {accessToken}, sockets, user}) => ({accessToken, sockets, user}), {connectSocket, disconnectSocket, getUserInfo})(App);
