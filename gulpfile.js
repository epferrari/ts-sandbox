require('ts-node').register({ project: './gulp' });
const {task, defaultTask} = require('./gulp');

task('clean');
task('transpileServer');
task('copyStatics');
task('awaitServer');
task('devServer', ['transpileServer', 'awaitServer']);
defaultTask(['clean', 'copyStatics', 'devServer']);