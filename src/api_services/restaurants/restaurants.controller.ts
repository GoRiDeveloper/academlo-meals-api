import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catch.async';
import { restaurantService } from '../../services/factory/entities.factory';

export const createRestaurant = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const restaurant = await restaurantService.createRestaurant(req.body);

    res.status(201).json({
      status: 'success',
      restaurant,
    });
  }
);

export const findAllRestaurants = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const [restaurants, results] = await restaurantService.findAllRestaurants();

    res.status(200).json({
      status: 'success',
      results,
      restaurants,
    });
  }
);

export const findRestaurant = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const restaurant = await restaurantService.findOneRestaurant(id, true);

    res.status(200).json({
      status: 'success',
      restaurant,
    });
  }
);

export const updateRestaurant = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const restaurantUpdated = await restaurantService.updateRestaurant(
      id,
      req.body
    );

    res.status(200).json({
      status: 'success',
      restaurantUpdated,
    });
  }
);

export const disabledRestaurant = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    await restaurantService.disableRestaurant(id);

    res.status(204).json({
      message: 'success',
    });
  }
);
