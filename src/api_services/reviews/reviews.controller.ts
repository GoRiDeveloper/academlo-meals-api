import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catch.async';
import { reviewService } from '../../services/factory/entities.factory';

export const createReview = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const restaurantId = Number(req.params.id);
    const userId = Number(req.sessionUser?.id);
    const review = await reviewService.createReview(
      userId,
      restaurantId,
      req.body
    );

    return res.status(201).json({
      status: 'success',
      review,
    });
  }
);

export const updateReview = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const reviewUpdated = await reviewService.updateReview(id, req.body);

    return res.status(200).json({
      status: 'success',
      reviewUpdated,
    });
  }
);

export const deleteReview = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    await reviewService.disableReview(id);

    return res.status(204).json({
      status: 'success',
    });
  }
);
