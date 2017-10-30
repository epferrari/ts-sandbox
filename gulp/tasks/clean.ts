import {exec} from 'shelljs';
import {TaskFactory} from '../taskFactory';


const clean: TaskFactory = (gulp, {rootPath, buildDir}) => () => {
  exec(`rm -rf ${rootPath}/${buildDir} && mkdir -p ${rootPath}/${buildDir}/server`);
};

export default clean;