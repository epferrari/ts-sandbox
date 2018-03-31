import {Router} from 'express';
import {asyncHandler} from '../../../middleware/asyncHandler';
import {ExampleCtrl} from '../../../controllers/example';

const exampleApi = Router();

exampleApi
  .get('/', ExampleCtrl.handleRoute)
  .get('/async', asyncHandler(ExampleCtrl.handleAsyncRoute));

export {exampleApi};