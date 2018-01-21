
import {task} from './task';

task('clean', []);
task('copyStatics', []);
task('tslint', []);
task('server:transpile', [], {path: 'transpileServer'});
task('server:await', [], {path: 'awaitServer'});
task('server:run', ['server:transpile', 'server:await'], {path: 'runDevServer'});
task('default', ['clean', 'copyStatics', 'server:run']);



