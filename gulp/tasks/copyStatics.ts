import {TaskFactory} from '../taskFactory';

const copyStatics: TaskFactory<NodeJS.ReadWriteStream> = (gulp, {rootPath, buildDir}) => () => {
  return gulp
    .src(`${rootPath}/src/public/*`)
    .pipe(gulp.dest(`${rootPath}/${buildDir}/public`));
};

export default copyStatics;