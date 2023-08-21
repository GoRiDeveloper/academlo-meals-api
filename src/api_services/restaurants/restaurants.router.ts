import { Router } from 'express';
import { reviewRouter } from '../reviews/review.router';
import { schemaValidation } from '../../middlewares/schema.middleware';
import { restaurantSchema } from './schema/restaurant.schema';
import {
  createRestaurant,
  findAllRestaurants,
  findRestaurant,
  updateRestaurant,
  disabledRestaurant,
} from './restaurants.controller';
import { idParamsSchema } from '../../schemas/global.schema';
import { validatePatchRestaurant } from '../../middlewares/restaurant.middleware';
import { protect, restrictTo } from '../../middlewares/auth.middleware';
import { UserRole } from '../users/types/user.types';

export const restaurantsRouter = Router();

restaurantsRouter.use('/reviews', reviewRouter);

restaurantsRouter.route('/').get(findAllRestaurants);

restaurantsRouter
  .route('/:id')
  .get(schemaValidation(idParamsSchema), findRestaurant);

restaurantsRouter.use(protect);

restaurantsRouter.use(restrictTo(UserRole.admin));

restaurantsRouter
  .use('/:id', schemaValidation(idParamsSchema))
  .route('/:id')
  .patch(
    validatePatchRestaurant,
    schemaValidation(restaurantSchema.deepPartial()),
    updateRestaurant
  )
  .delete(disabledRestaurant);

restaurantsRouter
  .route('/')
  .post(schemaValidation(restaurantSchema), createRestaurant);
