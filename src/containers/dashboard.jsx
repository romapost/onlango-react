import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout, uploadImage} from '../actions';
import Header from '../components/header.jsx';

const Dashboard = React.createClass({
  childContextTypes: {
    accessToken: React.PropTypes.string,
    refreshToken: React.PropTypes.string,
    userinfo: React.PropTypes.object,
    logout: React.PropTypes.func,
    uploadImage: React.PropTypes.func,
  },
  getChildContext: function() {
    const {userinfo, accessToken, refreshToken} = this.props.user;
    return {
      userinfo,
      accessToken,
      refreshToken,
      logout: this.props.logout,
      uploadImage: this.props.uploadImage,
    };
  },
  render: function() {
    return <div>
      <Header t={{x:1}}/>
      {this.props.children}
    </div>;
  }
});

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators({logout, uploadImage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
