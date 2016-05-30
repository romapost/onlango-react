import React from 'react';
import Header from '../components/header.jsx';

export default class Profile extends React.Component {
  state = {};
  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.setState({accessToken, user});
  }
  render() {
    const userpic = this.state.user ? this.state.user.image : '';
    return <div id='profile'>
      <Header userpic={userpic} />
      {this.props.children}
    </div>;
  }
}
