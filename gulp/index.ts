
import {task, group, main} from './task';

task('clean', []);
task('copyStatics', []);
task('tslint:tasks', [], {path: 'tslint', fn: 'lintTasks'});
task('tslint:server', [], {path: 'tslint', fn: 'lintServer'});
task('tslint:client', [], {path: 'tslint', fn: 'lintClient'});
group('tslint', ['tslint:client', 'tslint:server']);
task('server:compile', [], {path: 'compiler', fn: 'compileServer'});
task('server:watch', [], {path: 'compiler', fn: 'watchServer'});
task('server:run', ['server:compile'], {path: 'devServer', fn: 'run'});
task('server:test:single', ['server:compile'], {path: 'serverTest', fn: 'singleRun'});
task('server:test:hooks', [], {path: 'serverTest', fn: 'applyHooks'});
task('server:test', ['server:test:single', 'server:watch'], {path: 'serverTest', fn: 'continuous'});
main('clean', ['copyStatics', 'tslint'], 'server:watch', 'server:test:hooks', 'server:run');
