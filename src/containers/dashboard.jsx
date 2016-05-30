import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from '../actions';
import Header from '../components/header.jsx';

class Dashboard extends React.Component {
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object
  };
  state = {};
  componentDidMount() {
    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      user: JSON.parse(localStorage.getItem('user') || '{}')
    });
  }
  render() {
    const userpic = this.state.user ? this.state.user.image : '';
    return <div>
      <Header userpic={userpic} logout={this.props.logout}/>
      <h1>Welcome</h1>
    </div>;
  }
}

export default typeof window == 'undefined' ? Dashboard : connect(null, dispatch => bindActionCreators({logout}, dispatch))(Dashboard);
