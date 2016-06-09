import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const {func} = PropTypes;

class Entrance extends Component {
  static contextTypes = {
    tryRefreshToken: func
  };
  componentWillMount() {
    const {rt} = this.props.location.query;
    if (rt) this.context.tryRefreshToken(rt);
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

export default Entrance;
