import React from 'react';
import $ from 'jquery';

export default class Dashboard extends React.Component {
  static propTypes = {}
  static contextTypes = {
    router: React.PropTypes.object
  }
  render() {
    return <h1>Welcome</h1>;
  }
}
