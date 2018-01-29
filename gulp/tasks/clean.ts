import {TaskFactory} from '../taskFactory';
import * as del from 'del';


export const cleanServer: TaskFactory<void> = (gulp, {rootPath, buildDir}) => () => {
  return del([`${rootPath}/${buildDir}/server`]);
};

export const cleanClient: TaskFactory<void> = (gulp, {rootPath, buildDir}) => () => {
  return del([`${rootPath}/${buildDir}/{client,public}`]);
};
