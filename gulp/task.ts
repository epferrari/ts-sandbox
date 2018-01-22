import * as gulp from 'gulp';
import {ChildProcess} from 'child_process';
import {TaskContext} from './taskFactory';
import * as appRoot from 'app-root-path';

const processes: {child: ChildProcess, options: {}}[] = [];
const context: TaskContext = {
  buildDir: (process.env.NODE_ENV === 'production' ? 'dist' : 'build'),
  registerChildProcess: (child, options = {}) => {
    if (!options.silent) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    processes.push({child, options});
  },
  rootPath: appRoot.toString()
};

process.on('exit', () => {
  process.stdout.write('exiting');
  processes.forEach(p => p.child.kill());
});

process.stdin.on('data', d => {
  try {
    const text: string = d.toString();
    if(text.substring(0, 4) == 'kill') {
      process.exit(0);
    }
  } catch(e) {
    process.stdout.write(e);
  }
});
    

type TaskOptions = {
  path?: string;
  fn?: string;
};

export function task(name: string, deps: string[], options?: TaskOptions) {
  const {path = name, fn = 'default'} = options || {};
  gulp.task(
    name,
    deps,
    name === 'default' ? null : require(`./tasks/${path}`)[fn](gulp, context)
  );
}