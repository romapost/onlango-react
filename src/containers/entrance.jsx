import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Grid, Col} from 'react-bootstrap';
import {login, tryRefreshToken} from '../actions';

const {func, object} = PropTypes;

class Entrance extends Component {
  static childContextTypes = {
    login: func,
    tryRefreshToken: func,
    error: object
  };
  getChildContext = () => ({
    login: this.props.login,
    tryRefreshToken: this.props.tryRefreshToken,
    error: this.props.user.error
  })
  componentWillMount() {
    const {rt} = this.props.location.query;
    if (rt) this.props.tryRefreshToken(rt);
  }
  render() {
    return <Grid className='vertical-center entrance'>
      <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={10} xsOffset={1} className='box'>
        <div className='logo text-center'>
          Login to Onlango
        </div>
        {this.props.children}
        {/* <a href='#'>I forgot my password</a><br /> */}
        <div className='social-auth-links text-center'>
          <p>- OR -</p>
          <a href='/google'>Sign in using Google+</a>
        </div>
      </Col>
    </Grid>;
  }
}

export default connect(state => ({user: state.user}), dispatch => bindActionCreators({login, tryRefreshToken}, dispatch))(Entrance);
