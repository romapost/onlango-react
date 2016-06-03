import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout, uploadImage, uploadUserinfo, getUserinfo} from '../actions';
import Header from '../components/header.jsx';

class Dashboard extends React.Component {
  static childContextTypes = {
    accessToken: React.PropTypes.string,
    refreshToken: React.PropTypes.string,
    userinfo: React.PropTypes.object,
    logout: React.PropTypes.func,
    uploadImage: React.PropTypes.func,
    uploadUserinfo: React.PropTypes.func,
    getUserinfo: React.PropTypes.func,
  };
  getChildContext() {
    const {userinfo, accessToken, refreshToken} = this.props.user;
    return {
      userinfo,
      accessToken,
      refreshToken,
      logout: this.props.logout,
      uploadImage: this.props.uploadImage,
      uploadUserinfo: this.props.uploadUserinfo,
      getUserinfo: this.props.getUserinfo,
    };
  }
  componentWillMount() {
    this.props.getUserinfo(this.props.user.accessToken);
  }
  render() {
    return <div>
      <Header />
      {this.props.children}
    </div>;
  }
}

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators({logout, uploadImage, uploadUserinfo, getUserinfo}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
