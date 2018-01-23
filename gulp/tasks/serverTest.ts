import * as mocha from 'gulp-mocha';
import * as debug from 'gulp-debug';
import {TaskFactory, TaskContext} from '../taskFactory';
import {running as serverRunning} from './devServer';

const specFiles = ({rootPath, buildDir}: TaskContext) => `${rootPath}/${buildDir}/**/*.spec.js`;
let specWatcher: NodeJS.EventEmitter;

export const singleRun: TaskFactory<NodeJS.ReadWriteStream> = (gulp, context) => () => {
  return gulp
    .src(specFiles(context))
    .pipe(debug({title: 'Server test files:'}))
    .pipe(mocha());
};

export const continuous: TaskFactory<NodeJS.EventEmitter> = (gulp, context) => (done) => {
  const {onExit} = context;
  const retest = () => singleRun(gulp, context)();
  onExit(done);
  return (specWatcher = gulp.watch(specFiles(context), retest));
};

export const applyHooks: TaskFactory<void> = (gulp, context) => (done) => {
  const {registerCommand} = context;
  const writeFailure = () => process.stdout.write('No running server, cannot hook server specs\n');

  registerCommand('server:test:start', () => {
    if (serverRunning && !specWatcher) {
      singleRun(gulp, context)();
      specWatcher = continuous(gulp, context)();
    } else if (!serverRunning) {
      writeFailure();
    }
  });
  registerCommand('server:test:stop', () => {
    if (serverRunning && specWatcher) {
      // ooooold gaze watcher in gulp 3.x.x
      (specWatcher as any).end();
      specWatcher = null;
    } else if (!serverRunning) {
      writeFailure();
    }
  });

  done();
};