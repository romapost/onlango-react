import React, {PropTypes} from 'react';
import {Button, Image, Panel, Col, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const styles = {
  editButton: {
    marginTop: '2rem'
  }
};
const choose = d => {
    d %= 100;
    if (d > 10 && d < 20) return 2;
    d %= 10;
    if (d == 1) return 0;
    if (d > 1 && d < 5) return 1;
    return 2;
};

const Profile = (props, {user: {image = '/userpic.jpg', name, surname, country, city, year, month}}) => {
  const d = new Date();
  let age;
  if (year) {
    age = d.getFullYear() - year;
    if (d.getMonth() - month < 0) age -= 1;
    age = `${age} ${['год', 'года', 'лет'][choose(age)]}`;
  }
  return <Panel className='profile'>
    <Col sm={3} className='text-center'>
      <Image src={image} circle className='center-block' style={{width: '10rem'}} />
      <LinkContainer to='/profile/edit'><Button bsStyle='primary' bsSize='sm' style={styles.editButton}>Редактировать</Button></LinkContainer>
    </Col>
    <Col sm={4}>
      <h2>{[name, surname].join(' ')}</h2>
      <p><Glyphicon glyph='map-marker' /> {[country, city, age].filter(e => e).join(', ')}</p>
    </Col>
  </Panel>;
};

Profile.contextTypes = {
  user: PropTypes.object
};

export default Profile;
