const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    index:"./src/js/index.js",
    accounts:'./src/js/accounts.js',
    currency:'./src/js/currency.js',
    map:'./src/js/map.js'
  },
  output: {
     path: __dirname + '/dist',
    filename: "[name].js",
    library: '[name]',
  },
  module:{
    rules:[
        {
          test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.scss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'accounts.html',
      template: 'src/accounts.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'currency.html',
      template: 'src/currency.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'map.html',
      template: 'src/map.html',
      inject: false,
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
};
