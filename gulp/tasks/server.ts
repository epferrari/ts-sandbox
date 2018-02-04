import {TaskFactory} from '../taskFactory';
import * as nodemon from 'gulp-nodemon';

let serving = false;

export function running(): boolean {
  return serving;
}

export const serve: TaskFactory<void> = (gulp, {rootPath, buildDir, onExit}) => (done) => {
  // hackaround for nodemon stream not signaling done-ness to the gulp task
  onExit(done);

  return nodemon({
    script: `${rootPath}/${buildDir}/server`,
    ext: 'js json',
    env: {...process.env},
    watch: [
      `${rootPath}/${buildDir}/server`,
      `${rootPath}/${buildDir}/common`
    ],
    nodeArgs: ['--trace-warnings', '-r', 'source-map-support/register'],
    stdout: false
  } as any)
    .on('start', () => serving = true)
    .on('end', () => serving = false)
    .on('crash', () => serving = false);
};