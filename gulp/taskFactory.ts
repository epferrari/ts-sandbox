import {ChildProcess} from 'child_process';

export type TaskContext = {
  buildDir: 'build' | 'dist';
  registerChildProcess: (child: ChildProcess, options?: {silent?: boolean}) => void;
  rootPath: string;
};
export type TaskFactory = (gulp: any, context: TaskContext) => (cb?: () => void) => void;