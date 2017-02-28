import React, {Component, PropTypes} from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import {login, getUserInfo, logout} from 'actions';

class App extends Component {
  state = {count: 0};
  static childContextTypes = {
    socket: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func
  };
  static contextTypes = {
    router: PropTypes.object
  };
  getChildContext() {
    const {socket, user, logout} = this.props;
    return {socket, user, logout};
  }
  componentWillReceiveProps(nextProps) {
    const {socket, token, login, getUserInfo, location: {pathname}} = this.props;
    const {state, access_token} = this.props.location.hash.slice(1).split('&').reduce((s, e) => {
      const [name, value = true] = e.split('=');
      s[name] = value;
      return s;
    }, {});
    if (!socket.connected && nextProps.socket.connected) {
      console.log(token);
      if (token) login({token});
      else if (access_token) this.props.login({access_token, state});
    }
    if (!socket.authorized && nextProps.socket.authorized) {
      if (Object.keys(nextProps.user).length === 0) getUserInfo();
      if (/(?:login|register)/.test(pathname)) this.context.router.push('/dashboard');
    }
  }
  render() {
    return <Grid fluid>{this.props.children}</Grid>;
  }
}

const mapStateToProps = ({
  token, socket, user
}) => ({
  token, socket, user
});

const mapDispatchToProps = {login, getUserInfo, logout};

export default connect(mapStateToProps, mapDispatchToProps)(App);
