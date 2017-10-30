import * as gulp from 'gulp';
import {ChildProcess} from 'child_process';
import {TaskContext, TaskFactory} from './taskFactory';

const processes: {child: ChildProcess, options: {}}[] = [];
const context: TaskContext = {
  registerChildProcess: (child, options = {}) => {
    if (!options.silent) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    processes.push({child, options});
  }
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



