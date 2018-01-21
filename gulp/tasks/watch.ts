import * as gulp from 'gulp';
import {serverFiles} from '../vars';

gulp.task('watch', ['watch:server']);

gulp.task('watch:server', ['build:copyStatics', 'build:server'], () => (
  gulp.watch(serverFiles, ['build:server'])
));