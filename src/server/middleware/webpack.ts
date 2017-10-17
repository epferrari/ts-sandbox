import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackConfig from '../../../config/webpack/config';

const config = webpackConfig(process.env.NODE_ENV);
const compiler = webpack(config as any);
const devOptions = {
  publicPath: '/assets/'
};
const middleware = webpackDevMiddleware(compiler, devOptions);
