import {resolve} from 'path';
import {dev} from './common';

export * from './common';
export * from './keys';
export * from './oauth/server';
export const mongoUrl = `mongodb://${dev ? 'localhost' : 'db'}:27017/onlangoChat`;
export const publicPath = resolve(__dirname, '../public/');
export const tmpDir = resolve(__dirname, '../tmp/');
