import 'express';
import * as Logger from 'bunyan';

declare module 'express' {
  /* tslint:disable-next-line */
  interface Request {
    logger: Logger;
  }
}