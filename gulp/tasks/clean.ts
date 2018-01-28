import {exec} from 'shelljs';
import {TaskFactory} from '../taskFactory';


const clean: TaskFactory<void> = (gulp, {rootPath, buildDir}) => done => {
  exec(`rm -rf ${rootPath}/${buildDir} && mkdir -p ${rootPath}/${buildDir}/server`);
  done();
};

export default clean;