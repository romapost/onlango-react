import {db} from 'helpers';
import {ObjectId} from 'mongodb';
import {getTeachersList, getTeacherInfo} from 'actions';

export default {
  async [getTeachersList]() {
    const found = await db('users').find({status: 'teacher'}).toArray();
    const payload = found.map(
      ({
        _id: id, name, image, country, teacherForm: {experience,  languages}
      }) => ({
        id, image, name, experience, country, languages
      })
    );
    return getTeachersList(payload);
  },
  async [getTeacherInfo](id) {
    const found = await db('users').findOne({_id: ObjectId(id)});
    if (found) {
      const {_id: id, teacherForm: {experience, languages, interests, aboutSelf}, name, country, image} = found;
      return getTeacherInfo({id, experience, languages, interests, aboutSelf, name, country, image});
    }
  }
};
