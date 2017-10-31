import {TaskFactory} from '../taskFactory';

const copyStatics: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
  gulp
    .src(`${rootPath}/src/public/*`)
    .pipe(gulp.dest(`${rootPath}/${buildDir}/public`));
};

export default copyStatics;