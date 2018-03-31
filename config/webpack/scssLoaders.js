const cssLoaders = require('./cssLoaders');

module.exports = function scssLoaders(env, appRoot) {
  return [
    ...cssLoaders(env),
    {
      loader: 'sass-loader',
      options: {
        sourceMap: env === 'development',
        includePaths: [
          `${appRoot}/src/client/styles`,
          `${appRoot}/node_modules`
        ]
      }
    }
  ];
}