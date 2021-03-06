var path = require('path');
var webpack = require('webpack');

const config = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      loaders: ['babel', 'eslint'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: path.join(__dirname, 'assets/css')
    }, {
      test: /\.css$|\.scss$/,
      loaders: ['style', 'css?module&camelCase', 'postcss'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.png$/,
      loader: 'url?mimetype=image/png',
      include: path.join(__dirname, 'assets')
    }, {
      test: /\.jpg$/,
      loader: 'url?mimetype=image/jpeg',
      include: path.join(__dirname, 'assets')
    }, {
      test: /\.[ot]tf$/,
      loader: 'url?limit=65000&mimetype=application/octet-stream',
      include: path.join(__dirname, 'assets')
    }]
  },
  postcss: function() {
    return [require('autoprefixer'), require('precss')];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]);
} else {
  config.entry = config.entry.concat([
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
  ]),
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
}

module.exports = config;

