import {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {login} from 'actions';
import {browserHistory} from 'react-router';

class Entrance extends Component {
  static childContextTypes = {
    error: PropTypes.object,
    login: PropTypes.func
  }
  getChildContext() {
    const {error, login} = this.props;
    return {error, login};
  }
  componentWillMount() {
    // const {rt} = this.props.location.query;
    // if (rt) this.context.tryRefreshToken(rt);
  }
  componentWillReceiveProps(nextProps) {
    const {token} = nextProps;
    const onLoginPage = /(login|register)$/i.test(this.props.location.pathname);
    if (onLoginPage && token) browserHistory.push('/dashboard');
  }
  render() {
    return <Grid className='vertical-center entrance'>
      <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={10} xsOffset={1} className='box'>
        <div className='logo text-center'>
          Login to <LinkContainer to='/'><a>Onlango</a></LinkContainer>
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

export default connect(({
  authorization: {
    accessToken: token
  }
}) => ({token}), {login})(Entrance);
