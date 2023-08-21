import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app.error';

export const pathNotFound = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  return next(
    new AppError(`La Ruta (${req.originalUrl}) No Existe En El Servidor.`, 404)
  );
};
