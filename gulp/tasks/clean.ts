const appRoot = require('app-root-path').toString();
import {exec} from 'shelljs';
import {TaskFactory} from '../taskFactory';


const clean: TaskFactory = () => () => {
  exec(`rm -rf ${appRoot}/dist && mkdir -p ${appRoot}/dist/server`);
};

export default clean;