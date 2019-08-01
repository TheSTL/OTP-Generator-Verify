const HtmlWebPackPlugin = require("html-webpack-plugin");
const path =require('path');

module.exports = {
    entry:'./src/index.js',
  output: {
    path: path.join(__dirname,'/dist'),
    filename: 'client.js',
    publicPath:'/'
  },
  module: {  
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test:/\.css$/,
        use:'style-loader'
      },
      {
       test:/\.css$/,
       use:'css-loader'
     },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};