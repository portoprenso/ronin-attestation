const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

let isDev = process.env.NODE_ENV === 'development'
const optimization = function(){
  const config = {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  }

  if(!isDev){
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

console.log(isDev)
module.exports = {
  mode: isDev ? "development" : "production",
  target: "web",
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 300, // Process all changes which happened in this time into one rebuild
  //   poll: 1000, // Check for changes every second,
  //   ignored: /node_modules/,
  //   // ignored: [
  //   //   '**/*.scss', '/node_modules/'
  //   // ]
  // },
  entry: {main: ["./src/index.js"]},
  // entry: ["./polyfills.js","./src/index.js"],
  output: {
    filename: "[name].[contenthash].js",
    // chunkFilename: '[name]-[chunkhash].js',
    path: path.join(__dirname, "dist"),
    publicPath: "/", //used it to solve problem with error CANNOT GET / URL
    clean: true,
  },
  optimization: optimization(),
  devtool: isDev ? "source-map" : false,
  devServer: {
    historyApiFallback: true, //used it to solve problem with error CANNOT GET / URL
    hot: isDev,
    static: true, // './dist'
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyPlugin({
      patterns: [{
        from: 'assets',
        to: 'dist'
        // from: path.resolve(__dirname, 'assets/logo-main.png'),
        // to: 'dist'
      }]
    }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css'
    }),
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
      cache: false,
      minify: {
        collapseWhitespace: !isDev
      }
    }),

    // new webpack.optimize.MinChunkSizePlugin({
    //   minChunkSize: 10000, // Minimum number of characters
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
        // "style-loader",
        // {
        //   loader: MiniCssExtractPlugin.loader,
        //   options: {
        //     hmr: isDev,
        //     reloadAll: true
        //     // publicPath: (resourcePath, context) => {
        //     //   return path.relative(path.dirname(resourcePath), context) + "/";
        //     // },
        //   },
        // },
         "css-loader", "postcss-loader", "sass-loader"], //loaders are executes in reverse order, first sass, second css, and last style - it injects css into DOM
        // use: [
        //   MiniCssExtractPlugin.loader,
        // // "style-loader",
        // // {
        // //   loader: MiniCssExtractPlugin.loader,
        // //   options: {
        // //     hmr: isDev,
        // //     reloadAll: true
        // //     // publicPath: (resourcePath, context) => {
        // //     //   return path.relative(path.dirname(resourcePath), context) + "/";
        // //     // },
        // //   },
        // // },
        //  "css-loader", "postcss-loader", "sass-loader"], //loaders are executes in reverse order, first sass, second css, and last style - it injects css into DOM
      },
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
        // test: /\.svg$/,
        // use: ['@svgr/webpack', 'url-loader', 'file-loader'],
        // use: [
        //   {
        //     loader: "svg-url-loader",
        //     // options: {
        //     //   limit: 10000,
        //     // },
        //   },
        // ],
      },
    ],
  },
};