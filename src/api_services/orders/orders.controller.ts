import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catch.async';
import { orderService } from '../../services/factory/entities.factory';

export const findUserOrders = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = Number(req.sessionUser?.id);
    const { orders, results } = await orderService.findUserOrders(userId);

    return res.status(200).json({
      status: 'success',
      results,
      orders,
    });
  }
);

export const findUserOrder = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const userId = Number(req.sessionUser?.id);
    const order = await orderService.findOrder(id, userId, false, {
      meal: { restaurant: true },
      user: true,
    });

    return res.status(200).json({
      message: 'success',
      order,
    });
  }
);

export const createOrder = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.sessionUser?.id;
    const order = await orderService.createOrder(userId, req.body);

    return res.status(201).json({
      status: 'success',
      order,
    });
  }
);

export const completeOrder = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const mealCompleted = await orderService.completeOrder(id);

    return res.status(200).json({
      status: 'success',
      mealCompleted,
    });
  }
);

export const cancellOrder = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    await orderService.cancellOrder(id);

    return res.status(204).json({
      status: 'success',
    });
  }
);
