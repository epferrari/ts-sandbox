require('ts-node').register({ project: './gulp' });
const gulp = require('gulp');
const rootPath = require('app-root-path').toString();
const {Registry} = require('gulp-ts-foundation');
const config = {
  rootPath,
  webpackConfigPath: `${rootPath}/config/webpack/config.js`
};
const registry = new Registry(config);
gulp.registry(registry);