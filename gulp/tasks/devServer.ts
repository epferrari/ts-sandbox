import {TaskFactory} from '../taskFactory';
import {exec, ChildProcess} from 'child_process';

export const serve: TaskFactory<void> = (gulp, context) => done => {
  const {rootPath, webpackConfigPath, onExit, registerChildProcess} = context;
  const c = [
    `${rootPath}/node_modules/.bin/webpack-dev-server`,
    `--config ${webpackConfigPath}`,
    `--env development`
  ].join(' ');
  const child: ChildProcess = exec(c, (err, stdout, stderr) => {
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    done(err);
  });

  registerChildProcess(child);
  onExit(done);
};