import {createAction} from 'redux-actions';

const snakeToCamel = string => string.toLowerCase().replace(/_([a-z])/g, (s, p) => p.toUpperCase());

export default socket => (...actions) => actions.reduce((s, type) => {
  const name = snakeToCamel(type);
  s[name] = createAction(type, payload => payload, () => ({socket}));
  return s;
}, {});
