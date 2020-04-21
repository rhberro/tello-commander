const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  // mode: 'production',
  entry: path.resolve(__dirname, "source"),
  output: {
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: "style-loader!css-loader!sass-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: "static/", to: "static/" }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "source/index.html"),
      favicon: path.resolve(__dirname, "source/favicon.ico")
    })
  ],
  devtool: "eval-cheap-module-source-map",
  // devtool: 'hidden-source-map'
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "build")
  }
};
