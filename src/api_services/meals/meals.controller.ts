import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catch.async';
import { mealService } from '../../services/factory/entities.factory';

export const findAllMeals = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const [meals, results] = await mealService.findAllMeals();
    res.status(200).json({
      status: 'success',
      results,
      meals,
    });
  }
);

export const findMeal = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const meal = await mealService.findMeal(id, true);

    return res.status(200).json({
      status: 'success',
      meal,
    });
  }
);

export const createMeal = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const meal = await mealService.createMeal(id, req.body);

    return res.status(201).json({
      status: 'success',
      meal,
    });
  }
);

export const updateMeal = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const meal = await mealService.updateMeal(id, req.body);

    return res.status(200).json({
      status: 'success',
      meal,
    });
  }
);

export const deleteMeal = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    await mealService.disableMeal(id);
    return res.status(204).json({
      status: 'success',
    });
  }
);
