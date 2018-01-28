require('ts-node').register({ project: './gulp' });
const gulp = require('gulp');
const rootPath = require('app-root-path').toString();
const {Registry} = require('./gulp/registry');
const registry = new Registry({rootPath});
gulp.registry(registry);