import * as gulp from 'gulp';
import * as appRootPath from 'app-root-path';
import {Registry} from 'gulp-ts-foundation';

const rootPath = appRootPath.toString();
const config = {
  rootPath,
  webpackConfigPath: `${rootPath}/config/webpack/config.js`
};

gulp.registry(new Registry(config));