import React from 'react';
import {Button, Image, Grid, Row, Col, Glyphicon} from 'react-bootstrap';
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

const ProfileView = (props, context) => {
  const {image, name, surname, country, city, year} = context.userinfo;
  let age;
  if (year) {
    age = new Date().getFullYear() - year;
    age = `${age} ${['год', 'года', 'лет'][choose(age)]}`;
  }
  return <Grid className='profile'>
    <Row>
      <Col sm={3} className='text-center'>
        <Image src={image} circle className='center-block' />
        <LinkContainer to='/profile/edit'><Button bsStyle='primary' bsSize='sm' style={styles.editButton}>Редактировать</Button></LinkContainer>
      </Col>
      <Col sm={4}>
        <h2>{[name, surname].join(' ')}</h2>
        <p><Glyphicon glyph='map-marker' /> {[country, city, age].filter(e => e).join(', ')}</p>
      </Col>
    </Row>
  </Grid>;
};

ProfileView.contextTypes = {
  userinfo: React.PropTypes.object
};

export default ProfileView;
