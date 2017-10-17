import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
const webpackConfig = require('../../../config/webpack/config');

const config = webpackConfig(process.env.NODE_ENV);
const compiler = webpack(config as any);
const devOptions = {
  publicPath: '/public/'
};
export default webpackDevMiddleware(compiler, devOptions);
