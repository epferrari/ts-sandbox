import * as gulp from 'gulp';
import * as mocha from 'gulp-mocha';
import * as debug from 'gulp-debug';

import {serverBuildPath, serverFiles} from '../vars';

const testFiles = `${serverBuildPath}/**/*_spec.js`;

gulp.task('test', ['test:server']);

gulp.task('test:watch', ['test:server'], () => (
  gulp.watch(serverFiles, ['test:server'])
));

gulp.task('test:server', ['build'], () => (
  gulp
    .src(testFiles)
    .pipe(debug({title: 'Server test files:'}))
    .pipe(mocha())
));
