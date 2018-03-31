const {join} = require('path');

module.exports = function devServer(env, appRoot) {
  if(env === 'production') {
    return {}
  }

  return {
    publicPath: '/public/',
    contentBase: join(appRoot, 'build', 'public'),
    overlay: true,
    port: 3031
  };
}