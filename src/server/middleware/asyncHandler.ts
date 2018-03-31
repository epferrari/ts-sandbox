import {Request, Response, NextFunction} from 'express';

export function asyncHandler(fn: (req: Request, res: Response, next?: NextFunction) => void) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch(err) {
      next(err);
    }
  };
}