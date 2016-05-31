import React from 'react';
import {Button, Image, Grid, Row, Col} from 'react-bootstrap';
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
      <Col xs={3} className='text-center'>
        <Image src={image} circle className='center-block' />
        <LinkContainer to='/profile/edit'><Button bsStyle='info' bsSize='sm' style={styles.editButton}>Редактировать</Button></LinkContainer>
      </Col>
      <Col>
        <h2>{[name, surname].join(' ')}</h2>
        <p>{[country, city, birthdate].join(' ')}</p>
      </Col>
    </Row>
  </Grid>;
};

ProfileView.contextTypes = {
  userinfo: React.PropTypes.object
};

export default ProfileView;
