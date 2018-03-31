const {join} = require('path');

module.exports = function entry(env, appRoot) {
  return join(appRoot, 'src/client/index.tsx');
}