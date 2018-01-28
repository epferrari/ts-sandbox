import {spawn, ChildProcess} from 'child_process';
import {TaskFactory} from '../taskFactory';

let serving = false;

export function running(): boolean {
  return serving;
}

export const run: TaskFactory<void> = (gulp, {registerChildProcess, rootPath, buildDir, onExit}) => (done) => {
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
  child
    .on('start', () => serving = true)
    .on('exit', () => serving = false)
    .on('crash', () => serving = false);

  process.stdin.pipe(child.stdin);
  registerChildProcess(child);

  // intentionally keep the task from completing until the process is manually exited
  onExit(done);
};