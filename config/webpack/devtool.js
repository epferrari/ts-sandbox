module.exports = function devtool(env) {
  if (env === 'development' || env === 'test') {
    return 'cheap-module-source-map';
  } else {
    return false;
  }
}