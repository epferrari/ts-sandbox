
import {task, parallel, main, sequence} from './task';

import clean from './tasks/clean';
import buildStatics from './tasks/buildStatics';
import * as tslint from './tasks/tsLint';
import * as compiler from './tasks/compiler';
import * as serverTest from './tasks/serverTest';
import * as devServer from './tasks/devServer';

task('clean', clean);
task('build:statics', buildStatics);
task('tslint:tasks', tslint.lintTasks);
task('tslint:server', tslint.lintServer);
task('tslint:client', tslint.lintClient);
parallel('tslint', ['tslint:client', 'tslint:server']);
task('server:compile', compiler.compileServer);
task('server:watch', compiler.watchServer);
task('server:run', ['server:compile'], devServer.run);
task('server:test:single', ['server:compile'], serverTest.singleRun);
task('server:test:hooks', serverTest.applyHooks);
task('server:test', ['server:test:single', 'server:watch'], serverTest.continuous);
sequence('serve',
  'clean',
  ['build:statics', 'tslint'],
  ['server:watch', 'server:test:hooks'],
  'server:run'
);

main('serve');
