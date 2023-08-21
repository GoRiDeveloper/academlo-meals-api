import { Router } from 'express';
import {
  validatePatchReview,
  validateYourReview,
} from '../../middlewares/review.middleware';
import {
  createReview,
  updateReview,
  deleteReview,
} from '../reviews/reviews.controller';
import { schemaValidation } from '../../middlewares/schema.middleware';
import {
  restaurantIdParamsSchema,
  idParamsSchema,
} from '../../schemas/global.schema';
import { reviewSchema } from './schema/review.schema';
import { protect } from '../../middlewares/auth.middleware';

export const reviewRouter = Router();

reviewRouter.use(protect);

reviewRouter.post(
  '/:id',
  schemaValidation(idParamsSchema),
  schemaValidation(reviewSchema),
  createReview
);

reviewRouter
  .use(
    '/:restaurantId/:id',
    schemaValidation(restaurantIdParamsSchema),
    schemaValidation(idParamsSchema),
    validateYourReview
  )
  .route('/:restaurantId/:id')
  .patch(
    validatePatchReview,
    schemaValidation(reviewSchema.deepPartial()),
    updateReview
  )
  .delete(deleteReview);
