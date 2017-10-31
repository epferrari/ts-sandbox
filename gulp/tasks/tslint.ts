import {TaskFactory} from '../taskFactory';
import tslintPlugin from 'gulp-tslint';
import * as tslint from 'tslint';

const tslinter: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
  const taskProgram = tslint.Linter.createProgram(`${rootPath}/gulp/tsconfig.json`);
  const clientProgram = tslint.Linter.createProgram(`${rootPath}/src/client/tsconfig.json`);
  const serverProgram = tslint.Linter.createProgram(`${rootPath}/src/server/tsconfig.json`);
  const formatter = 'stylish';

  gulp.src(`${rootPath}/gulp/**/*.ts`)
    .pipe(tslintPlugin({
      formatter,
      program: taskProgram
    }))
    .pipe(tslintPlugin.report());

  gulp.src(`${rootPath}/src/server/**/*.ts`)
    .pipe(tslintPlugin({
      formatter,
      program: serverProgram
    }))
    .pipe(tslintPlugin.report());

  gulp.src(`${rootPath}/src/client/**/*.ts{x}`)
    .pipe(tslintPlugin({
      formatter,
      program: clientProgram
    }))
    .pipe(tslintPlugin.report());
};

export default tslinter;