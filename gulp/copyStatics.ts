const appRoot = require('app-root-path').toString();
import {exec} from 'shelljs';
import {TaskFactory} from './taskFactory';

const copyStatics: TaskFactory = () => () => {
  const publicDest = `${appRoot}/dist/public`;
  exec(`mkdir -p ${publicDest}`);
  exec(`cp -a ${appRoot}/src/public/. ${publicDest}`);
}

export default copyStatics;