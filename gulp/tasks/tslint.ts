import {TaskFactory} from '../taskFactory';
import tslintPlugin from 'gulp-tslint';
import * as tslint from 'tslint';
import {Program} from 'typescript';

let taskProgram: Program;
let clientProgram: Program;
let serverProgram: Program;
const formatter = 'stylish';

export const lintTasks: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
  taskProgram || (taskProgram = tslint.Linter.createProgram(`${rootPath}/gulp/tsconfig.json`));

  return gulp.src(`${rootPath}/gulp/**/*.ts`)
    .pipe(tslintPlugin({
      formatter,
      program: taskProgram
    }))
    .pipe(tslintPlugin.report());
}

export const lintServer: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
  serverProgram || (serverProgram = tslint.Linter.createProgram(`${rootPath}/src/server/tsconfig.json`));

  return gulp.src(`${rootPath}/src/server/**/*.ts`)
    .pipe(tslintPlugin({
      formatter,
      program: serverProgram
    }))
    .pipe(tslintPlugin.report());
};

export const lintClient: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
  clientProgram || (clientProgram = tslint.Linter.createProgram(`${rootPath}/src/client/tsconfig.json`));

  return gulp.src(`${rootPath}/src/client/**/*.ts{x}`)
    .pipe(tslintPlugin({
      formatter,
      program: clientProgram
    }))
    .pipe(tslintPlugin.report());
};