var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './app/index.js'),
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, './app/common/'),
      user: path.resolve(__dirname, './app/user/'),
      constants: path.resolve(__dirname, './app/constants/'),
      reducers: path.resolve(__dirname, './app/reducers/'),
      images: path.resolve(__dirname, './app/images'),
    },
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'app'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  }
}