import {clearUndefinedProps} from 'helpers';

export function userInfo(user, self) {
  const info = {id: user._id};
  const fields = (self ?
    'image,name,surname,country,city,email,phone,gender,interests,day,month,year,status' :
    'image,name,gender,status').split(',');
  for (const key of fields) {
    const value = user[key];
    if (typeof value !== 'undefined') info[key] = value;
  }
  return info;
}

export function teacherFormInfo(data, flat) {
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
    delete teacherForm.resumeFile;
    return {...res, ...teacherForm};
  } else {
    return {...res, teacherForm};
  }
}
