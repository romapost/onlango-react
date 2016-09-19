import {resolve} from 'path';

export * from './common';
export * from './keys';
export * from './oauth/server';
export const mongoUrl = 'mongodb://localhost:27017/onlangoChat';
export const publicPath = resolve(__dirname, '../public/');
