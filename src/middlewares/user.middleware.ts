import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catch.async';
import { userService } from '../services/factory/entities.factory';
import { AppError } from '../utils/app.error';

export const userExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      const id = Number(req.params.id);
      const attributes = {
        id: true,
        role: true,
      };
      const user = await userService.findOneUser(
        { id },
        attributes,
        false,
        true
      );

      req.user = user;
    }

    next();
  }
);

export const validatePatchUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const uniqueDataToUpdate = ['comment', 'rating'];

  Object.keys(req.body).forEach((key) => {
    !uniqueDataToUpdate.includes(key) && delete req.body[key];
  });

  if (Object.keys(req.body).length < 1)
    return next(new AppError('No Se Pueden Actualizar Objetos Vacios.', 400));

  next();
};

export const validateYourUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const yourUserId = req.sessionUser?.id;
  const userId = req.user?.id;

  if (yourUserId !== userId)
    return next(
      new AppError('Solo Puedes Realizar Esta Acción Con Tu Usuario', 403)
    );

  next();
};
