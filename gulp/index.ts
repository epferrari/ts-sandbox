import * as gulp from 'gulp';
import {ChildProcess} from 'child_process';
import {TaskContext, TaskFactory} from './taskFactory';
const appRoot = require('app-root-path').toString();

const processes: {child: ChildProcess, options: {}}[] = [];
const context: TaskContext = {
  registerChildProcess: (child, options = {}) => {
    if (!options.silent) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    processes.push({child, options});
  },
  rootPath: appRoot,
  buildDir: process.env.NODE_ENV === 'production' ? 'dist' : 'build'
};

process.on('exit', () => {
  process.stdout.write('exiting');
  processes.forEach(p => p.child.kill());
});

export function task(name: string, deps: string[] = []) {
  return gulp.task(
    name,
    deps,
    require(`./tasks/${name}`).default(gulp, context)
  );
}

export function defaultTask(tasks: string[]) {
  return gulp.task('default', tasks);
}



