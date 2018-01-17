import * as express from 'express';
import {Request, Response} from 'express';
import {join} from 'path';
const app = express();

if (process.env.NODE_ENV === 'development') {
  process.stdout.write('using webpack dev middlware');
  app.use(require('./middleware/webpack').default);
}

app.get('*', (req: Request, res: Response) => res.sendFile(join(__dirname, '../public/index.html')));

export default app;