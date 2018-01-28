import {FSWatcher} from 'fs';
import * as ts from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import {TaskFactory} from '../taskFactory';

let tsProject: ts.Project;

export const compileServer: TaskFactory<NodeJS.ReadWriteStream> = (gulp, {rootPath, buildDir}) => () => {
  const project = tsProject || (tsProject =
    ts.createProject(`${rootPath}/src/server/tsconfig.json`)
  );
  return gulp.src(`${rootPath}/src/server/**/*.ts`)
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: './'
    }))
    .pipe(gulp.dest(`${rootPath}/${buildDir}/server`));
};

export const watchServer: TaskFactory<NodeJS.EventEmitter> = (gulp, context) => (done) => {
  const {rootPath, onExit} = context;
  const recompile = () => {
    process.stdout.write('recompiling server...\n');
    compileServer(gulp, context)();
  };
  const watcher: FSWatcher = gulp.watch(`${rootPath}/src/server/*`, recompile);
  onExit(watcher.close.bind(watcher));
  done();
  return watcher;
};

