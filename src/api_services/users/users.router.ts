import { Router } from 'express';
import { userSchema, loginSchema } from './schema/user.schema';
import { idParamsSchema } from '../../schemas/global.schema';
import {
  userExists,
  validatePatchUser,
} from '../../middlewares/user.middleware';
import { findUserOrders, findUserOrder } from '../orders/orders.controller';
import { protect } from '../../middlewares/auth.middleware';
import { validateYourUser } from '../../middlewares/user.middleware';
import { schemaValidation } from '../../middlewares/schema.middleware';
import {
  createUser,
  provideAccess,
  updateUser,
  disabledUser,
} from './users.controller';

export const usersRouter = Router();

usersRouter.post('/signup', schemaValidation(userSchema), createUser);
usersRouter.post('/login', schemaValidation(loginSchema), provideAccess);

usersRouter.use(protect);

usersRouter.get('/orders', findUserOrders);
usersRouter.get('/orders/:id', schemaValidation(idParamsSchema), findUserOrder);

usersRouter
  .use('/:id', schemaValidation(idParamsSchema), userExists, validateYourUser)
  .route('/:id')
  .patch(
    validatePatchUser,
    schemaValidation(userSchema.deepPartial()),
    updateUser
  )
  .delete(disabledUser);
