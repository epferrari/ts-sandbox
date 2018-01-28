import {Gulp} from 'gulp';
import {autobind} from 'core-decorators';
import {ChildProcess} from 'child_process';
import * as killTree from 'tree-kill';
import * as appRoot from 'app-root-path';

type ContextCommand = {
  handler: (args?: {[arg: string]: string | boolean}) => void;
  description: string;
  options?: string[];
};

export type ContextOptions= {
  rootPath: string;
  buildDir?: string;
}

@autobind
export class TaskContext {
  private childProcesses: {child: ChildProcess, options: {}}[] = [];
  private teardowns: (() => void)[] = [];
  private commands: {[command: string]: ContextCommand} = {};

  // TODO: pass these into the registry factory and then into this ctor
  public readonly rootPath: string;
  public readonly buildDir: string;

  constructor(options: ContextOptions) {

    this.rootPath = options.rootPath;
    this.buildDir = options.buildDir || (process.env.NODE_ENV === 'production' ? 'dist' : 'build');
    this.registerCommand(':q', () => {
      process.stdout.write('exiting\n');
      this.exitGracefully();
      process.exit(0);
    }, 'Quit all tasks');

    this.registerCommand(':commands', () => {
      const {commands} = this;
      process.stdout.write('\nAvailable Commands\n\n');
      Object.keys(commands).forEach(name => {
        const command = commands[name];
        process.stdout.write(`${name} -- ${command.description}\n`);
        if (command.options) {
          process.stdout.write(`   Options: ${command.options.join(' ')}\n`);
        }
      });
    }, 'List available commands');

    process.on('exit', this.exitGracefully);
    this.listenForCommands();
  }

  public registerChildProcess(child: ChildProcess, options: {silent?: boolean} = {}): void {
    if (!options.silent) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    this.childProcesses.push({child, options});
  }

  public registerCommand(
    command: string,
    handler: ContextCommand['handler'],
    description: string,
    options?: string[]
  ): void {
    const {commands} = this;
    if (commands[command]) {
      throw new Error(`Command ${command} already registered. Pick a unique command name`);
    }
    if (!/^\:/.test(command)) {
      throw new Error(`Command ${command} should start with a ":"`);
    }
    if ((/\s/).test(command)) {
      throw new Error(`Commands should not have spaces, check ${command}`);
    }
    commands[command] = {handler, description, options};
  }

  private exitGracefully() {
    this.childProcesses.forEach(p => {
      killTree(p.child.pid);
      p.child.kill();
    });
    this.teardowns.forEach(cb => cb && cb());
  }

  public onExit(cb: () => void): void {
    this.teardowns.push(cb);
  }

  private listenForCommands(): void {
    const {commands} = this;

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
  }
};




