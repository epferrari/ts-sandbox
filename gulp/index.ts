import * as gulp from 'gulp';
import * as appRootPath from 'app-root-path';
import {BasicWebAppTooling} from 'gulp-ts-foundation';

const rootPath = appRootPath.toString();
const config = {
  rootPath,
  webpackConfigPath: `${rootPath}/config/webpack/config.js`
};

gulp.registry(new BasicWebAppTooling(config));