import React from 'react';
import {Button, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Header from './header.jsx';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class ProfileEdit extends React.Component {
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object
  };
  state = {};
  onDrop = ([file]) => {
    request
      .post('/api/setuserpic')
      .set('Authorization', `Bearer ${this.state.accessToken}`)
      .attach('image', file)
      .end((err, res) => {
        this.setState({user: {...this.state.user, image: res.header.location}});
        localStorage.setItem('user', JSON.stringify(this.state.user));
      });
  };
  componentDidMount() {
    console.log(1);
    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      user: JSON.parse(localStorage.getItem('user') || '{}')
    });
  }
  render() {
    console.log(1);
    const userpic = this.state.user ? this.state.user.image : '';
    return <div>
      <Header userpic={userpic} />
      <h1>Welcome</h1>
      <Dropzone onDrop={this.onDrop} multiple={false}>
        <Image src={userpic} circle/>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    </div>;
  }
}
