import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as del from 'del';
import * as runSequence from 'run-sequence';
import * as sourcemaps from 'gulp-sourcemaps';
import {serverFiles, staticFiles, rootPath, buildDir, serverBuildPath} from '../vars';

const tsProject = ts.createProject('src/server/tsconfig.json');

gulp.task('build', (done) => (
  runSequence('build:clean', ['build:server', 'build:copyStatics'], done)
));

gulp.task('build:clean', () => (
  del([
    `${rootPath}/${buildDir}`
  ])
));

gulp.task('build:server', () => (
  gulp
    .src(serverFiles)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.', {
      sourceRoot: './',
      includeContent: false
    }))
    .pipe(gulp.dest(serverBuildPath))
));

gulp.task('build:copyStatics', () => {
  gulp
    .src(staticFiles)
    .pipe(gulp.dest(`${rootPath}/${buildDir}/public`));
});