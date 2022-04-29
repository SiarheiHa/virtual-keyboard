const path = require("path");
// видео Ворожун
// const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // очищает папку dist перед сборкой нового бандла

module.exports = {
  devtool: "source-map", // mapping on
  // watch: true, // вотчинг можно прописать в плагинах можно здесь но если есть вебсервер то и не надо
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script.js",
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'keyB'
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",  
        ],
      },
      {
        test: /\.(?:ico|png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // compress: true,
    // port: 9000,
  },
  
};
