import {Router} from 'express';
import {allowCors} from './middleware/allowCors';
import {apiLogger} from './middleware/apiLogger';
import {exampleApi} from './example';

const api = Router();

api.use(allowCors);
api.use(apiLogger);
api.use('/example', exampleApi);

export {api};