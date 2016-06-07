import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout, uploadImage, uploadUserinfo, getUserinfo, changePassword} from '../actions';
import Header from '../components/header.jsx';
import Sidebar from '../components/sidebar.jsx';
import {Grid, Row, Col} from 'react-bootstrap';

class Dashboard extends React.Component {
  static childContextTypes = {
    accessToken: React.PropTypes.string,
    refreshToken: React.PropTypes.string,
    userinfo: React.PropTypes.object,
    logout: React.PropTypes.func,
    uploadImage: React.PropTypes.func,
    uploadUserinfo: React.PropTypes.func,
    getUserinfo: React.PropTypes.func,
    changePassword: React.PropTypes.func,
  };
  getChildContext() {
    const {userinfo, accessToken, refreshToken} = this.props.user;
    const {logout, uploadImage, uploadUserinfo, getUserinfo, changePassword} = this.props;
    return {
      userinfo,
      accessToken,
      refreshToken,
      logout,
      uploadImage,
      uploadUserinfo,
      getUserinfo,
      changePassword
    };
  }
  componentWillMount() {
    this.props.getUserinfo(this.props.user.accessToken);
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

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators({logout, uploadImage, uploadUserinfo, getUserinfo, changePassword}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
