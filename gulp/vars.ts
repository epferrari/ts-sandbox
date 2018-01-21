import * as appRoot from 'app-root-path';

export const rootPath = appRoot.toString();
export const buildDir = (process.env.NODE_ENV === 'production' ? 'dist' : 'build');
export const serverFiles = `${rootPath}/src/server/**/*.ts`;
export const staticFiles = `${rootPath}/src/public/*`;

export const serverBuildPath = `${rootPath}/${buildDir}/server`;