import * as express from 'express';
import * as helmet from 'helmet';
import {logging} from './middleware/logging';
import {errorHandler} from './middleware/errorHandler';
import {api} from './routes/api';

const app = express();

app
  .use(helmet())
  .use(logging)
  .use('/api', api)
  .get('*', (req: express.Request, res: express.Response) => res.json({
    date: Date.now(),
    success: true
  }))
  .use(errorHandler);

export default app;