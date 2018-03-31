const {join} = require('path');

module.exports = function output(env, appRoot) {
  return {
    filename: "bundle.js",
    path: env === 'development' ? '/' : join(appRoot, "dist", "public"),
  };
}