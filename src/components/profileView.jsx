import React from 'react';
import {Button, Image, Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const styles = {
  editButton: {
    marginTop: '2rem'
  }
};

const ProfileView = (props, context) => {
  const {image, name, surname, country, city, birthdate} = context.userinfo;
  return <Grid className='profile'>
    <Row>
      <Col sm={3} className='text-center'>
        <Image src={image} circle className='center-block' />
        <LinkContainer to='/profile/edit'><Button bsStyle='primary' bsSize='sm' style={styles.editButton}>Редактировать</Button></LinkContainer>
      </Col>
      <Col sm={4}>
        <h2>{[name, surname].join(' ')}</h2>
        <p><Glyphicon glyph='map-marker' /> {[country, city, birthdate].filter(e => e).join(', ')}</p>
      </Col>
    </Row>
  </Grid>;
};

ProfileView.contextTypes = {
  userinfo: React.PropTypes.object
};

export default ProfileView;
