import {Request, Response, NextFunction} from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {

  req.logger.error({err});
  res.sendStatus(500);
}