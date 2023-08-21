import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catch.async';
import { AppError } from '../utils/app.error';
import { jwtSecret } from '../config/config';
import { userService } from '../services/factory/entities.factory';
import { verifyJWT } from '../utils/jwt';
import { DecodedAuthType } from '../types/global.types';

export const protect = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];

    if (!token)
      return next(
        new AppError('No Has Iniciado Sesión, ¡Por Favor Inicia Sesión!', 401)
      );

    const decoded = (await verifyJWT(token, jwtSecret)) as DecodedAuthType;

    const attributes = {
      password: false,
      status: false,
    };
    const userExists = await userService.findOneUser(
      { id: decoded.id },
      attributes,
      false,
      true
    );

    req.sessionUser = userExists;

    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.sessionUser?.role))
      return next(new AppError('Acción Denegada, No Tienes Permisos.', 403));
    next();
  };
};
