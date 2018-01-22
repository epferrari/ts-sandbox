import {ChildProcess} from 'child_process';
import {Gulp} from 'gulp';

export type TaskContext = {
  buildDir: 'build' | 'dist';
  registerChildProcess: (child: ChildProcess, options?: {silent?: boolean}) => void;
  rootPath: string;
};
export type TaskFactory = (gulp: Gulp, context: TaskContext) => (cb?: (...args: any[]) => void) => void;