const autoprefixer = require('autoprefixer');

module.exports = function cssLoaders(env) {
  return [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: env === 'development'
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: env === 'development',
      plugins: () => ([autoprefixer])
    }
  }];
}