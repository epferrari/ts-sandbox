import {Request, Response} from 'express';

export class ExampleCtrl {
  public static handleRoute(req: Request, res: Response): void {
    res.json({success: true});
  }

  public static async handleAsyncRoute(req: Request, res: Response): Promise<void> {
    await new Promise(done => {
      setTimeout(() => {
        res.json({success: true, async: true});
        done();
      }, 500);
    });
  }
}