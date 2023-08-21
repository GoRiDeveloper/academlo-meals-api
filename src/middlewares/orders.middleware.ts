import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catch.async';
import { orderService } from '../services/factory/entities.factory';
import { OrderStatus } from '../api_services/orders/types/order.types';
import { AppError } from '../utils/app.error';

export const verifyOrder = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const userId = Number(req.sessionUser?.id);
    const relationAttributes = { user: true, meal: true };
    const order = await orderService.findOrder(
      id,
      userId,
      false,
      relationAttributes
    );

    if (order?.status !== OrderStatus.active)
      return next(new AppError('La Orden No Esta Activa.', 400));

    next();
  }
);
