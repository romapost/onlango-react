import {publicPath} from 'config';
import lwip from 'lwip';
import fse from 'fs-extra';
import crypto from 'crypto';

export const processUserImage = ({file, type}) => new Promise((resolve, reject) => {
  lwip.open(file, type.replace(/^.+\//, ''), (err, image) => {
    if (err) reject(err);
    const size = Math.min(image.width(), image.height());
    image
      .batch()
      .crop(size, size)
      .resize(128, 128)
      .toBuffer('jpg', (err, buf) => {
        if (err) reject(err);
        const url = `/userpics/${crypto
          .createHash('sha1')
          .update(buf)
          .digest('hex')}`;
        const path = `${publicPath}/${url}`;
        fse.stat(path, (err, stats) => {
          if (!stats) fse.outputFile(path, buf, err => {
            if (err) reject(err);
            else resolve(url);
          });
          else resolve(url);
        });
      });
  });
});

export function userInfo(user, self) {
  const info = {id: user._id};
  const fields = (self ?
    'image,name,surname,country,city,email,phone,gender,interests,day,month,year' :
    'image,name,gender').split(',');
  for (const key of fields) {
    const value = user[key];
    if (typeof value !== 'undefined') info[key] = value;
  }
  return info;
}

export function teacherInfo(data, flat) {
  const {city, country} = data;
  const {
    languages, schedule, experience, experienceOnline, hoursCanTeach,
    aboutSelf, street, street2, zipcode, state, phone, skype, resumeFile
  } = 'teacherForm' in data ? data.teacherForm : data;

  const teacherForm = clearUndefinedProps({
    languages, schedule, experience, experienceOnline, hoursCanTeach,
    aboutSelf, street, street2, zipcode, state, phone, skype, resumeFile
  });

  const res = clearUndefinedProps({city, country});
  if (flat) {
    delete res.resumeFile;
    return {...res, ...teacherForm};
  } else {
    return {...res, teacherForm};
  }
}

export function clearUndefinedProps(obj) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (typeof obj[key] == 'undefined') delete obj[key];
  }
  return obj;
}
