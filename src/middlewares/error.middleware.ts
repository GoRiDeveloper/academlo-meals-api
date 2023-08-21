import { NextFunction, Request, Response } from 'express';
import {
  sendErrorDev,
  sendErrorProd,
} from '../api_services/error/error.controller';
import { mode, modes } from '../config/config';
import { ERROR_TYPES } from '../types/error.types';
import {
  handleCastError22001,
  handleCastError22P02,
  handleCastError2305,
  handleJWTExpiredError,
  handleJWTError,
  handleSequelizeDbError,
  handleSequelizeValidatonError,
  handleTORMDuplicate,
} from '../utils/errors';

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (mode === modes.development) sendErrorDev(err, res);

  if (mode === modes.production) {
    let error = err;

    if (err.parent?.code === ERROR_TYPES.exceededLength)
      error = handleCastError22001();
    if (err.parent?.code === ERROR_TYPES.invalidTypeData)
      error = handleCastError22P02();
    if (err.parent?.code === ERROR_TYPES.duplicateValue)
      error = handleCastError2305();
    if (err.parent?.code === ERROR_TYPES.invalidToken) error = handleJWTError();
    if (err.parent?.code === ERROR_TYPES.tokenExpired)
      error = handleJWTExpiredError();
    if (err.parent?.code === ERROR_TYPES.sequelizeDatabase)
      error = handleSequelizeDbError();
    if (err.code === ERROR_TYPES.typeORMDuplicate)
      error = handleTORMDuplicate(err.detail);
    if (err.parent?.code === ERROR_TYPES.sequelizeValidation)
      error = handleSequelizeValidatonError(err.errors);

    sendErrorProd(error, res);
  }
};
