import { Router } from 'express';
import {
  findAllMeals,
  findMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} from './meals.controller';
import { protect, restrictTo } from '../../middlewares/auth.middleware';
import { schemaValidation } from '../../middlewares/schema.middleware';
import { idParamsSchema } from '../../schemas/global.schema';
import { mealSchema } from './schema/meal.schema';
import { validatePatchMeal } from '../../middlewares/meal.middleware';
import { UserRole } from '../users/types/user.types';

export const mealsRouter = Router();

mealsRouter.get('/', findAllMeals);

mealsRouter.use('/:id', schemaValidation(idParamsSchema));

mealsRouter.get('/:id', findMeal);

mealsRouter.use(protect);
mealsRouter.use(restrictTo(UserRole.admin));

mealsRouter
  .route('/:id')
  .post(schemaValidation(mealSchema), createMeal)
  .patch(
    validatePatchMeal,
    schemaValidation(mealSchema.deepPartial()),
    updateMeal
  )
  .delete(deleteMeal);
