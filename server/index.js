require('babel-register')({
  plugins: [
      'transform-async-to-generator',
      'transform-es2015-modules-commonjs',
      // 'transform-es2015-destructuring',
      // 'transform-es2015-parameters',
      // 'transform-class-properties',
      // 'transform-object-rest-spread'
    ]
});
require('./init.js');