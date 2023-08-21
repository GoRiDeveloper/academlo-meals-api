import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catch.async';
import { userService } from '../../services/factory/entities.factory';

export const createUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      status: 'success',
      user,
    });
  }
);

export const provideAccess = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { token, user } = await userService.signIn(req.body);
    return res.status(200).json({
      status: 'success',
      token,
      user,
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const result = await userService.updateUser(id, req.body);

    res.status(201).json({
      status: 'success',
      result,
    });
  }
);

export const disabledUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);

    await userService.disableUser(id);

    return res.status(204).json({
      status: 'success',
    });
  }
);
