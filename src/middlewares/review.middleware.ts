import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catch.async';
import { reviewService } from '../services/factory/entities.factory';
import { AppError } from '../utils/app.error';

export const validateYourReview = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const relationAttributes = {
      user: true,
      restaurant: true,
    };

    const review = await reviewService.findOneReview(
      id,
      false,
      relationAttributes,
      true
    );

    if (review?.restaurant.id !== Number(req.params.restaurantId))
      return next(new AppError('El Id Del Restaurante No Coincide.', 400));
    if (review?.user.id !== req.sessionUser?.id)
      return next(
        new AppError(
          'Solo Puedes Realizar Esta Acción Con El Usuario Que Escribio La Reseña',
          403
        )
      );

    next();
  }
);

export const validatePatchReview = (
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
