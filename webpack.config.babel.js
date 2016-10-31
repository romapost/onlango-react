import path from 'path';
import webpack from 'webpack';
import {dev} from './config/common';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const minsuffix = dev ? '' : '.min';

const config = {
  resolve: {
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'src/'),
      path.resolve(__dirname, 'src/jsx/')
    ],
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    bundle: ['./src/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: `[name]${minsuffix}.js`
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', ['es2015', {loose: true}]],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ].concat(dev ? 'react-hot-loader/babel' : [])
        }
      },
      Object.assign(
        {test: /\.scss$/},
        dev
          ? {loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap']}
          : {loader: ExtractTextPlugin.extract(['css?sourceMap','sass?sourceMap'])}
      ),
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url'
      },
      {
        test: /\.(png|mp3)$/,
        loader: 'file'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/sass/')
    ]
  },
  postcss: () => [precss, autoprefixer],
  devServer: {
    contentBase: ['public', 'uploads'],
    publicPath: '/',
    inline: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({'React': 'react'}),
    new webpack.SourceMapDevToolPlugin({
      test: [/bundle/, /main/],
      filename: '[file].map'
    }),
    new HtmlWebpackPlugin({
      title: 'Chat App',
      template: 'src/index.pug',
      appMountId: 'root'
    }),
  ]
};

if (dev) {
  config.entry.bundle.unshift('webpack/hot/dev-server', 'react-hot-loader/patch',);
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else {
  config.entry.bundle.unshift('babel-polyfill');
  config.plugins.push(
    new ExtractTextPlugin('main.css'),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => isExternal(module)
    }),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  );
}

export default config;

function isExternal(module) {
  const userRequest = module.userRequest;
  if (typeof userRequest !== 'string') return false;
  return userRequest.indexOf('/node_modules/') >= 0;
}
