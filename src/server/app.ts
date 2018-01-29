import * as express from 'express';
import {Request, Response} from 'express';
import {join} from 'path';
const app = express();

app.get('*', (req: Request, res: Response) => res.json({
  date: Date.now(),
  success: true
}));

export default app;