import * as gulp from 'gulp';
import {use} from 'run-sequence';
import {ChildProcess} from 'child_process';
import {TaskContext, TaskFactory} from './taskFactory';
import * as appRoot from 'app-root-path';

const processes: {child: ChildProcess, options: {}}[] = [];
const doneCallbacks: (() => void)[] = [];
const commands: {[command: string]: {
  handler: (args?: {[arg: string]: string|boolean}) => void;
  description: string;
  options?: string[];
 }} = {};

const context: TaskContext = {
  buildDir: (process.env.NODE_ENV === 'production' ? 'dist' : 'build'),
  rootPath: appRoot.toString(),
  registerChildProcess: (child, options = {}) => {
    if (!options.silent) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    processes.push({child, options});
  },
  registerCommand: (command, handler, description, options) => {
    if (commands[command]) {
      throw new Error(`Command ${command} already registered. Pick a unique command name`);
    }
    if(!/^\:/.test(command)) {
      throw new Error(`Command ${command} should start with a ":"`);
    }
    if((/\s/).test(command)) {
      throw new Error(`Commands should not have spaces, check ${command}`);
    }
    commands[command] = {handler, description, options};
  },
  onExit: (cb) => {
    doneCallbacks.push(cb);
  }
};

context.registerCommand(':q', () => {
  process.exit(0);
}, 'Quit all tasks');

context.registerCommand(':c', () => {
  process.stdout.write('\nAvailable Commands\n\n');
  Object.keys(commands).forEach(name => {
    const command = commands[name];
    process.stdout.write(`${name} -- ${command.description}\n`);
    if (command.options) {
      process.stdout.write(`   Options: ${command.options.join(' ')}\n`);
    }
  });
}, 'List available commands');

process.on('exit', () => {
  process.stdout.write('exiting\n');
  doneCallbacks.forEach(cb => cb && cb());
  processes.forEach(p => p.child.kill());
});

process.stdin.on('data', d => {
  try {
    const input: string = d.toString().trim();
    if (/^\:/.test(input)) {
      const sArgs = input.split(/\s+/);
      const command = sArgs.shift();
      if (commands[command]) {
        const args = sArgs.reduce((acc, arg) => {
          arg = arg.replace(/^\-+/, '');
          if (/\=/.test(arg)) {
            const kv = arg.split('=');
            acc[kv[0]] = kv[1];
          } else {
            acc[arg] = true;
          }
          return acc;
        }, {});

        commands[command].handler(args);
      }
    }
  } catch (e) {
    process.stdout.write(e);
  }
});

// hack to combat some nonsense with the process not exiting when the tasks are done
gulp.on('stop', () => process.exit(0));

export function task<T>(name: string, depsOrFactory: (string[])|TaskFactory<T>, factory?: TaskFactory<T>): void {
  let deps: string[];
  let taskFactory: TaskFactory<T>;
  if (Array.isArray(depsOrFactory)) {
    deps = depsOrFactory;
    taskFactory = factory;
  } else {
    deps = [],
    taskFactory = depsOrFactory;
  }
  gulp.task(name, deps, taskFactory(gulp, context));
}

const runSequence = use(gulp);
// identical API to run-sequence, except the first argument names the task and registers it
export function sequence(name: string, ...tasks: (string|string[])[]): void {
  gulp.task(name, [], done => runSequence(...tasks, done));
}

export function parallel(name: string, tasks: string[]): void {
  gulp.task(name, [], done => runSequence(tasks, done));
}

// wrapper for default, uses run-sequence API for tasks arguments
export function main(...tasks: (string | string[])[]): void {
  sequence('default', ...tasks);
}