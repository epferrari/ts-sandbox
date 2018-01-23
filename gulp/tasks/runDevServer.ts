import {spawn, ChildProcess} from 'child_process';
import {TaskFactory} from '../taskFactory';

const devServer: TaskFactory = (gulp, {registerChildProcess, rootPath, buildDir}) => (done) => {
  const child: ChildProcess = spawn(
    `${rootPath}/node_modules/.bin/nodemon`,
    [
      `-w`,
      `./${buildDir}/server`,
      `./${buildDir}/server`,
      `--trace-warnings`,
      `-r`,
      `source-map-support/register`
    ],
    {
      cwd: rootPath,
      env: {...process.env, NODE_ENV: 'development'}
    }
  );
  process.stdin.pipe(child.stdin);
  registerChildProcess(child);

  // intentionally keep the task from completing until the process is manually exited
  process.on('exit', done);
};
export default devServer;
