import {resolve} from 'path';

export * from './common';
export * from './keys';
export * from './oauth/server';
export const mongoUrl = 'mongodb://db:27017/onlangoChat';
export const publicPath = resolve(__dirname, '../public/');
export const tmpDir = resolve(__dirname, '../tmp/');
