import * as gulp from 'gulp';
import {use} from 'run-sequence';
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
  process.stdout.write('exiting\n');
  processes.forEach(p => p.child.kill());
});

process.stdin.on('data', d => {
  try {
    const text: string = d.toString();
    if (text.substring(0, 2) === ':q') {
      process.exit(0);
    }
  } catch (e) {
    process.stdout.write(e);
  }
});

// hack to combat some nonsense with the process not exiting when the tasks are done
gulp.on('stop', () => process.exit(0));

type TaskOptions = {
  path?: string;
  fn?: string;
};


export function task(name: string, deps: string[], options?: TaskOptions): void {
  const {path = name, fn = 'default'} = options || {};
  gulp.task(
    name,
    deps,
    require(`./tasks/${path}`)[fn](gulp, context)
  );
}

const runSequence = use(gulp);
// identical API to run-sequence, except the first argument names the task and registers it
export function sequence(name: string, ...tasks: (string|string[])[]): void {
  gulp.task(name, [], done => runSequence(...tasks, done));
}

// run tasks in parallel
export function group(name: string, tasks: string[]): void {
  gulp.task(name, [], done => runSequence(tasks, done));
}

// wrapper for default, uses run-sequence API for tasks arguments
export function main(...tasks: (string | string[])[]): void {
  sequence('default', ...tasks);
}