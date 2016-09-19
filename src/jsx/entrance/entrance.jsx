import {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {login} from 'actions';
import {OAuthData} from 'config';

class Entrance extends Component {
  static childContextTypes = {
    login: PropTypes.func
  };
  static contextTypes = {
    router: PropTypes.object,
    token: PropTypes.string,
    count: PropTypes.number
  };
  getChildContext() {
    return {login: this.props.login};
  }
  render() {
    return <Row className='vertical-center entrance'>
      <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={10} xsOffset={1} className='box'>
        <div className='logo text-center'>
          Login to <LinkContainer to='/'><a>Onlango</a></LinkContainer>
        </div>
        {this.props.children}
        {/* <a href='#'>I forgot my password</a><br /> */}
        <div className='social-auth-links text-center'>
          <p>- OR -</p>
          <a href={OAuthData.google}>Sign in using Google+</a>
        </div>
      </Col>
    </Row>;
  }
}

export default connect(null, {login})(Entrance);
