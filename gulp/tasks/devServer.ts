import {spawn, ChildProcess} from 'child_process';
import {TaskFactory} from '../taskFactory';

const devServer: TaskFactory = (gulp, {registerChildProcess, rootPath, buildDir}) => () => {
  const child: ChildProcess = spawn(
    `nodemon`,
    [`-w`, `./${buildDir}/server`, `./${buildDir}/server`],
    {
      cwd: rootPath,
      env: {...process.env, NODE_ENV: 'development'}
    }
  );
  process.stdin.pipe(child.stdin);
  registerChildProcess(child);
};
export default devServer;
