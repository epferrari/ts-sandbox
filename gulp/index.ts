
import {task, group, main, sequence} from './task';

task('clean', []);
task('copyStatics', []);
task('tslint:tasks', [], {path: 'tslint', fn: 'lintTasks'});
task('tslint:server', [], {path: 'tslint', fn: 'lintServer'});
task('tslint:client', [], {path: 'tslint', fn: 'lintClient'});
group('tslint', ['tslint:client', 'tslint:server']);
task('server:compile', [], {path: 'compiler', fn: 'compileServer'});
task('server:watch', [], {path: 'compiler', fn: 'watchServer'});
task('server:run', ['server:compile'], {path: 'runDevServer'});
main('clean', ['copyStatics', 'tslint'], 'server:watch', 'server:run');
