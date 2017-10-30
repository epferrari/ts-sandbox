const appRoot = require('app-root-path').toString();
import {spawn, ChildProcess} from 'child_process';
import {existsSync} from 'fs';
import {join} from 'path';
import {TaskFactory} from '../taskFactory';

const awaitServer = (timeout: number) => new Promise((resolve, reject) => {
  let err = false;
  const fallback = setTimeout(() => {err = true;}, timeout);
  (function check(){
    if(err) {
      reject(`No server found after ${timeout/1000} seconds`);
    } else if (existsSync(`${appRoot}/dist/server/index.js`)) {
      clearTimeout(fallback);
      resolve();
    } else {
      setTimeout(check, 50);
    }
  })();
});

const transpileServer: TaskFactory = (gulp, {registerChildProcess}) => () => {  
  const child: ChildProcess = spawn(
    `tsc`,
    [`-w`, `-p`, `${appRoot}/src/server`]
  );
  registerChildProcess(child);
  return awaitServer(10000);
}
export default transpileServer;