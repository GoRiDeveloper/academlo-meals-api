import express from 'express';
import { router } from './routes/index';
import { globalErrorHandler } from './middlewares/error.middleware';

export const app = express();

app.use(express.json());

app.use('/api/v1', router);

app.use(globalErrorHandler);
