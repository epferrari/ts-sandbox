
import {task} from './task';

task('clean', []);
task('copyStatics', []);
task('tslint', []);
task('server:compile', [], {path: 'compiler', fn: 'compileServer'});
task('server:watch', [], {path: 'compiler', fn: 'watchServer'});
task('server:run', ['server:compile'], {path: 'runDevServer'});
task('default', ['clean', 'copyStatics', 'tslint', 'server:watch', 'server:run']);


