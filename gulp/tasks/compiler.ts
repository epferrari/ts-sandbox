import {WatchEvent} from 'gulp';
import * as ts from 'gulp-typescript';
import {TaskFactory} from '../taskFactory';
import * as sourcemaps from 'gulp-sourcemaps';

let tsProject: ts.Project;

export const compileServer: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
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

export const watchServer: TaskFactory = (gulp, context) => () => {
  const {rootPath} = context;
  const recompile = (event: WatchEvent) => {
    process.stdout.write('recompiling server...\n');
    compileServer(gulp, context)();
  };
  return gulp.watch(`${rootPath}/src/server/*`, recompile);
};

