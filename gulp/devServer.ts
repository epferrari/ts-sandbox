import {spawn, ChildProcess} from 'child_process';
import {TaskFactory} from './taskFactory';
const appRoot = require('app-root-path').toString();

const devServer: TaskFactory = (gulp, {registerChildProcess}) => () => {
  const child: ChildProcess = spawn(
    `nodemon`,
    [`-w`, `./dist/server`, `./dist/server`],
    {
      cwd: appRoot,
      env: {...process.env, NODE_ENV: 'development'}
    }
  );
  process.stdin.pipe(child.stdin);
  registerChildProcess(child);
};
export default devServer;
