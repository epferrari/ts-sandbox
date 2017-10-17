import * as express from 'express';
import {Request, Response} from 'express';
import {join} from 'path';
const app = express();

console.log('env', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
  console.log('using webpack dev middlware');
  app.use(require('./middleware/webpack').default);
}

app.get('/', (req: Request, res: Response) => res.sendFile(join(__dirname, '../public/index.html')));

export default app;