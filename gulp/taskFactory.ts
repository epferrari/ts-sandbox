import * as gulp from 'gulp';
import {ChildProcess} from 'child_process';

export type TaskContext = {
  registerChildProcess: (child: ChildProcess, options?: {silent?: boolean}) => void;
  [property: string]: any;
};
export type TaskFactory = (instance: gulp, context: TaskContext) => (cb?: () => void) => void;