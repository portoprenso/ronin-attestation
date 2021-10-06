const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: ["./polyfills.js","./src/index.js"],
  output: {
    filename: "[name].[hash].js",
    // chunkFilename: '[name]-[chunkhash].js',
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "dist"),
      verbose: true,
      dry: false,
      exclude: ["shared.js"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
      path: path.join(__dirname, "dist"),
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.apiKey": "AIzaSyDahDsihomVM182rwr2_9G3hGsQf5tbO4w",
      "process.env.authDomain": "ronin-project-ff1a7.firebaseapp.com",
      "process.env.projectId": "ronin-project-ff1a7",
      "process.env.storageBucket": "ronin-project-ff1a7.appspot.com",
      "process.env.messagingSenderId": "508457530615",
      "process.env.appId": "1:508457530615:web:df83ffe89c631266940ff2",
    }),
    // new webpack.optimize.MinChunkSizePlugin({
    //   minChunkSize: 10000, // Minimum number of characters
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"], //loaders are executes in reverse order, first sass, second css, and last style - it injects css into DOM
      },
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
};
