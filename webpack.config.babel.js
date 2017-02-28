import path from 'path';
import webpack from 'webpack';
import {dev} from './config/common.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import BabiliPlugin from 'babili-webpack-plugin';

const rules = [
  {
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: [['env', {chrome: 56}], 'react'],
      plugins: [
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }
  },
  {
    test: /\.scss$/
  },
  {
    test: /\.pug$/,
    loader: 'pug-loader'
  },
  {
    test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
    loader: 'url-loader'
  },
  {
    test: /\.(png|mp3)$/,
    loader: 'file-loader'
  }
];

const config = {
  resolve: {
    modules: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'src/'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
  entry: {
    bundle: ['./src/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: `[name].js`
  },
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chat App',
      template: 'src/index.pug',
      appMountId: 'root'
    }),
  ]
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/sass/')
    ]
  }
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [precss, autoprefixer]
  }
};

if (dev) {
  sassLoader.options.sourceMap = true;
  postcssLoader.options.sourceMap = true;
  rules[1].use = [
    'style-loader',
    'css-loader?sourceMap',
    postcssLoader,
    sassLoader
  ];
  config.devtool = 'inline-source-map';
} else {
  rules[1].use = ExtractTextPlugin.extract([
    'css-loader',
    postcssLoader,
    sassLoader
  ]);
  config.entry.bundle.unshift('babel-polyfill');
  config.plugins.push(
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
    new BabiliPlugin({}, {comments: false}),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => isExternal(module)
    })
  );
}

export default config;

function isExternal(module) {
  const userRequest = module.userRequest;
  if (typeof userRequest !== 'string') return false;
  return userRequest.indexOf('/node_modules/') >= 0;
}
