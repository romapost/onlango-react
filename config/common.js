export const dev = process.env.NODE_ENV != 'production';
export const host = dev ? 'http://localhost:3000' : '';
export const languages = 'English,German,Italian,Spanish,French'.split(',');
export const domain = dev ? 'localhost' : 'onlango.com';
