import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app.error';

export const validatePatchRestaurant = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const uniqueDataToUpdate = ['name', 'address'];

  Object.keys(req.body).forEach(
    (key) => !uniqueDataToUpdate.includes(key) && delete req.body[key]
  );

  if (Object.keys(req.body).length < 1)
    return next(new AppError('No Se Pueden Actualizar Objetos Vacios.', 400));

  next();
};
