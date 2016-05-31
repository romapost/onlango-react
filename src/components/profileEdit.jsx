import React from 'react';
import {Image, Grid, Row, Col} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const ProfileEdit = (props, context) => {
  const {image, name, surname, country, city, birthdate} = context.userinfo;
  return <Grid className='profile edit'>
    <Row>
      <Col xs={3} className='text-center'>
        <Dropzone onDrop={([file]) => { context.uploadImage(file, context.accessToken) }} multiple={false}>
          <Image src={image} circle/>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </Col>
      <Col>
        <h2>{[name, surname].join(' ')}</h2>
        <p>{[country, city, birthdate].join(' ')}</p>
      </Col>
    </Row>
  </Grid>;
};

ProfileEdit.contextTypes = {
  userinfo: React.PropTypes.object,
  uploadImage: React.PropTypes.func,
  accessToken: React.PropTypes.string
};

export default ProfileEdit;
