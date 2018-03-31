import {Request, Response, NextFunction} from 'express';
import {Logger} from '../../../services/logger';

export function apiLogger(req: Request, res: Response, next: NextFunction): void {
  const parentLogger: Logger = req.logger;
  const additionalLoggerParams = {scope: 'api', path: req.path};
  if (parentLogger) {
    req.logger = parentLogger.child(additionalLoggerParams);
  } else {
    req.logger = new Logger(additionalLoggerParams);
  }

  next();
}