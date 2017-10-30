require('ts-node').register({ project: './gulp' });
const {task, defaultTask} = require('./gulp');

task('clean');
task('transpileServer');
task('copyStatics');
task('devServer', ['transpileServer']);
defaultTask(['clean', 'copyStatics', 'devServer']);