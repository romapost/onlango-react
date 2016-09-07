import {resolve} from 'path';

export * from './common';
export * from './keys';
export const mongoUrl = 'mongodb://localhost:27017/onlangoChat';
export const publicPath = resolve(__dirname, '../public/');
