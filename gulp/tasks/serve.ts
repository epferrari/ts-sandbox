import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import {buildDir} from '../vars';

gulp.task('serve', ['watch:server'], () => (
  nodemon({
    script: `./${buildDir}/server`,
    env: {...process.env, NODE_ENV: 'development'},
    nodeArgs: ['--trace-warnings', '-r', 'source-map-support/register']
  } as any)
));
