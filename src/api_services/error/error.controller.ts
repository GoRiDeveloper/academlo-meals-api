import { Response } from 'express';
import { ErrorModel } from './error.model';
import { AppError } from '../../utils/app.error';

export const sendErrorDev = async (err: any, res: Response) => {
  await ErrorModel.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  }).save();

  if (err?.query) err.query = 'UNAUTHORIZED';

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

export const sendErrorProd = (err: AppError, res: Response) => {
  console.log(err);
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  return res.status(500).json({
    status: 'fail',
    message: 'Algo Salio Mal',
  });
};
