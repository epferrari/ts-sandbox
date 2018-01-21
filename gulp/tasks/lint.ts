import * as tslint from 'tslint';
import * as gulp from 'gulp';
import tslintPlugin from 'gulp-tslint';
import {rootPath} from '../vars';

const taskProgram = tslint.Linter.createProgram(`${rootPath}/gulp/tsconfig.json`);
const clientProgram = tslint.Linter.createProgram(`${rootPath}/src/client/tsconfig.json`);
const serverProgram = tslint.Linter.createProgram(`${rootPath}/src/server/tsconfig.json`);
const formatter = 'verbose';

gulp.task('lint', ['lint:tslint']);

gulp.task('lint:tslint', ['lint:tslint:gulp', 'lint:tslint:server', 'lint:tslint:client']);

gulp.task('lint:tslint:gulp', () => (
  gulp.src(`${rootPath}/gulp/**/*.ts`)
  .pipe(tslintPlugin({
    formatter,
    program: taskProgram
  }))
  .pipe(tslintPlugin.report())
));

gulp.task('lint:tslint:server', () => (
  gulp
    .src(`${rootPath}/src/server/**/*.ts`)
    .pipe(tslintPlugin({
      formatter,
      program: serverProgram
    }))
    .pipe(tslintPlugin.report())
));

gulp.task('lint:tslint:client', () => (
  gulp.src(`${rootPath}/src/client/**/*.ts{x}`)
    .pipe(tslintPlugin({
      formatter,
      program: clientProgram
    }))
    .pipe(tslintPlugin.report())
));
