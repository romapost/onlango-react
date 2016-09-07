import {Component} from 'react';
import {connect} from 'react-redux';
import {connectSocket} from 'actions';

class App extends Component {
  componentWillMount() {
    this.props.connectSocket('common');
  }
  componentWillUnmount() {
    this.props.disconnectSocket();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect(null, {connectSocket})(App);
