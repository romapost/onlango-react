import path from 'path';
import webpack from 'webpack';
import {dev} from './config/common';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
    app: ['./src/index.jsx'],
    vendor: [
      'babel-polyfill',
      'moment',
      'react-big-calendar',
      'react-bootstrap',
      'react-dom',
      'react-dropzone',
      'react-redux',
      'react-router-bootstrap',
      'react-router',
      'react',
      'redux-actions',
      'redux-thunk',
      'redux',
      'socket.io-client',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: `bundle${minsuffix}.js`
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [['es2015', {'loose': true}], 'react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css?sourceMap','sass?sourceMap'])
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
        test: /\.png$/,
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
  devServer: {
    contentBase: 'public',
    inline: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', `vendor${minsuffix}.js`),
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
    new ExtractTextPlugin('main.css')
  ]
};

if (dev) {
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
  );
}

export default config;
