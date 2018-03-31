const appRoot = require('app-root-path').toString();
const {join} = require('path');
const entry = require('./entry');
const devtool = require('./devtool');
const devServer = require('./devServer');
const output = require('./output');
const resolve = require('./resolve');
const cssLoaders = require('./cssLoaders');
const scssLoaders = require('./scssLoaders');

module.exports = function webpackConfig(env) {
  return {
    entry: entry(env, appRoot),
    output: output(env, appRoot),
    devtool: devtool(env),
    devServer: devServer(env, appRoot),
    resolve: resolve(env, appRoot),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "awesome-typescript-loader",
          options: {configFileName: join(appRoot, './src/client/tsconfig.json')}
        },
        {
          test: /\.js$/,
          enforce: "pre",
          loader: "source-map-loader"
        },
        {
          test: /\.css$/,
          use: cssLoaders(env)
        },
        {
          test: /\.scss$/,
          use: scssLoaders(env)
        },
        {
          test: /\.(svg|ttf|eot|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        }
      ]
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  };
};



