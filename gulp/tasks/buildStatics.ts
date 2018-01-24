import {TaskFactory} from '../taskFactory';

const buildStatics: TaskFactory<NodeJS.ReadWriteStream> = (gulp, {rootPath, buildDir}) => () => {
  return gulp
    .src(`${rootPath}/src/public/*`)
    .pipe(gulp.dest(`${rootPath}/${buildDir}/public`));
};

export default buildStatics;