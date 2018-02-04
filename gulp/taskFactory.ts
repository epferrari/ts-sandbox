import {Gulp} from 'gulp';
import {TaskContext} from './taskContext';

export type TaskFactory<T> = (gulp: Gulp, context: TaskContext) => (cb?: (err?: any) => void) => T;