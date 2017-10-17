const appRoot = require("app-root-path").toString();
const {join} = require("path");

module.exports = function webpackConfig(env) {
  return {
    entry: join(appRoot, "src/client/index.tsx"),
    output: {
      filename: "bundle.js",
      path: env === 'development' ? '/' : join(appRoot, "dist", "public")
    },
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
          options: {configFileName: join(appRoot, './src/client/tsconfig.json')}
        },
        {
          test: /\.js$/,
          enforce: "pre",
          loader: "source-map-loader"
        }
      ]
    },

    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  };
};