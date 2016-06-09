import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';

const {func, object, string} = PropTypes;

class App extends Component {
  static childContextTypes = {
    accessToken: string,
    refreshToken: string,
    userinfo: object,
    logout: func,
    uploadImage: func,
    uploadUserinfo: func,
    getUserinfo: func,
    changePassword: func,
    login: func,
    tryRefreshToken: func,
    error: object
  };
  getChildContext() {
    const {userinfo, accessToken, refreshToken, error} = this.props.user;
    const {login, logout, tryRefreshToken, uploadImage, uploadUserinfo, getUserinfo, changePassword} = this.props;
    return {
      login,
      logout,
      tryRefreshToken,
      error,
      userinfo,
      accessToken,
      refreshToken,
      uploadImage,
      uploadUserinfo,
      getUserinfo,
      changePassword
    };
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
