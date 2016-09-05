import {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {host} from 'config';
import {connectSocket} from 'actions';

class App extends Component {
  componentWillMount() {
    const socket = io(`${host}/common`, {path: '/api'});
    this.props.connectSocket({name: 'common', socket});
  }
  componentWillUnmount() {
    this.props.disconnectSocket();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect(null, {connectSocket})(App);
