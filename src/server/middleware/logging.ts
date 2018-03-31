import {Request, Response, NextFunction} from 'express';
import {Logger} from '../services/logger';

export function logging(req: Request, res: Response, next: NextFunction): void {
  req.logger = new Logger();
  req.logger.info({req});
  next();
}