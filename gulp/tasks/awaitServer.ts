import {existsSync} from 'fs';
import {TaskFactory} from '../taskFactory';

const timeout = 10000;

const awaitServer: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
  const serverPath = `${rootPath}/${buildDir}/server/index.js`;
  return new Promise((resolve, reject) => {
    let err = false;
    const fallback = setTimeout(() => {err = true;}, timeout);
    (function check() {
      if (err) {
        reject(`No server found after ${timeout / 1000} seconds`);
      } else if (existsSync(serverPath)) {
        clearTimeout(fallback);
        resolve();
      } else {
        setTimeout(check, 50);
      }
    })();
  });
};

export default awaitServer;