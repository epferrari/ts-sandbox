import {ChildProcess} from 'child_process';
import {Gulp} from 'gulp';

export type TaskContext = {
  buildDir: 'build' | 'dist';
  registerChildProcess: (child: ChildProcess, options?: {silent?: boolean}) => void;
  registerCommand: (command: string, handler: () => void, description?: string) => void;
  onExit: (cb: () => void) => void;
  rootPath: string;
};
export type TaskFactory<T> = (gulp: Gulp, context: TaskContext) => (cb?: (err?: any) => void) => T;