
import * as gulp from 'gulp';
import {TaskContext} from './taskContext';
import {TaskFactory} from './taskFactory';

import clean from './tasks/clean';
import buildStatics from './tasks/buildStatics';
import * as tslint from './tasks/tsLint';
import * as compiler from './tasks/compiler';
import * as serverTest from './tasks/serverTest';
import * as devServer from './tasks/devServer';

const ctx = new TaskContext(gulp);
const {task, parallel, series} = gulp;
const provide = (factory: TaskFactory<any>) => factory(gulp, ctx);

task('clean', provide(clean));
task('build:statics', provide(buildStatics));
task('tslint:tasks', provide(tslint.lintTasks))
task('tslint:server', provide(tslint.lintServer));
task('tslint:client', provide(tslint.lintClient));
task('tslint', parallel('tslint:client', 'tslint:client'));
task('server:compile', provide(compiler.compileServer));
task('server:watch', provide(compiler.watchServer));
task('server:run', series(
  'server:compile',
  provide(devServer.run)
));
task('server:test:single', series(
  'server:compile',
  provide(serverTest.singleRun)
));
task('server:test:hooks', provide(serverTest.applyHooks));
task('server:test', series(
  parallel('server:test:single', 'server:watch'),
  provide(serverTest.continuous)
));
task('serve', series(
  'clean',
  parallel('build:statics', 'tslint'),
  parallel('server:watch', 'server:test:hooks'),
  'server:run'
));
task('default', task('serve'));
