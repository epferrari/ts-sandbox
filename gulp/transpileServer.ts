const appRoot = require('app-root-path').toString();
import {spawn, ChildProcess} from 'child_process';
import {existsSync} from 'fs';
import {TaskFactory} from './taskFactory';

const awaitServer = () => new Promise((resolve, reject) => {
  const check = () => {
    if (existsSync(`${appRoot}/dist/server/index.js`)) {
      resolve();
    } else {
      setTimeout(check, 50);
    }
  };
  check();
});

const transpileServer: TaskFactory = (gulp, {registerChildProcess}) => (next) => {
  awaitServer().then(next);
  const child: ChildProcess = spawn(`tsc`, [`-w`, `-p`, `./src/server`], {cwd: appRoot});
  registerChildProcess(child);
}
export default transpileServer;