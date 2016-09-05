import path from 'path';

export const dev = process.env.NODE_ENV != 'production';
export const mongoUrl = 'mongodb://localhost:27017/onlangoChat';
export const host = dev ? 'http://localhost:3000' : '';

export default {
  dev,
  mongoUrl,
  host
};
