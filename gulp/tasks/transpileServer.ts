import {spawn, ChildProcess} from 'child_process';
import {TaskFactory} from '../taskFactory';

const transpileServer: TaskFactory = (gulp, {registerChildProcess, rootPath, buildDir}) => () => { 
  const child: ChildProcess = spawn(
    `tsc`,
    [
      `-w`,
      `--outDir`, `${rootPath}/${buildDir}/server`,
      `-p`, `${rootPath}/src/server`
    ]
  );
  registerChildProcess(child);
}
export default transpileServer;