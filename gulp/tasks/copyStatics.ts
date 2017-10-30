const appRoot = require('app-root-path').toString();
import {exec} from 'shelljs';
import {TaskFactory} from '../taskFactory';

const copyStatics: TaskFactory = (gulp) => () => {
  gulp
    .src(`${appRoot}/src/public/*`)
    .pipe(gulp.dest(`${appRoot}/dist/public`));
}

export default copyStatics;