import React from 'react';
import {Button, Image, Grid, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import request from 'superagent';

const styles = {
  editButton: {
    marginTop: '2rem'
  }
};

export default class Profile extends React.Component {
  state = {};
  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.setState({accessToken, user});
    request
      .get('/api/userinfo')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        this.setState({userinfo: res.body});
      });
  }
  render() {
    return <div id='profile'>
      {this.state.userinfo && <Grid>
        <Row>
          <Col xs={3} className='text-center'>
            <Image src={this.state.userinfo.image} circle className='center-block' />
            <LinkContainer to='/profile/edit'><Button bsStyle='info' bsSize='sm' style={styles.editButton}>Редактировать</Button></LinkContainer>
          </Col>
          <Col>
            <h2>{[this.state.userinfo.name, this.state.userinfo.surname].join(' ')}</h2>
            <p>{[this.state.userinfo.country, this.state.userinfo.city, this.state.userinfo.birthdate].join(' ')}</p>
          </Col>
        </Row>
      </Grid>}
    </div>;
  }
}
