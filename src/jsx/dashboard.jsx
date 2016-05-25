import React from 'react';

export default class Dashboard extends React.Component {
  static propTypes = {}
  static contextTypes = {
    router: React.PropTypes.object
  }
  logout = e => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.context.router.push('login');
  }
  render() {
    return <div>
      <h1>Welcome</h1>
      <a href='##' onClick={this.logout}>logout</a>
    </div>
    ;
  }
}
