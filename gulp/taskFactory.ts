import {ChildProcess} from 'child_process';

export type TaskContext = {
  registerChildProcess: (child: ChildProcess, options?: {silent?: boolean}) => void;
  rootPath: string;
  buildDir: 'build'|'dist';
};
export type TaskFactory = (gulp: any, context: TaskContext) => (cb?: () => void) => void;