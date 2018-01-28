require('ts-node').register({ project: './gulp' });
const gulp = require('gulp');
const {registry} = require('./gulp/registry');

gulp.registry(registry(gulp));