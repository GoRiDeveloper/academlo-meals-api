import { Router } from 'express';
import {
  findUserOrders,
  createOrder,
  completeOrder,
  cancellOrder,
} from './orders.controller';
import { protect } from '../../middlewares/auth.middleware';
import { schemaValidation } from '../../middlewares/schema.middleware';
import { orderSchema } from './schema/order.schema';
import { idParamsSchema } from '../../schemas/global.schema';
import { verifyOrder } from '../../middlewares/orders.middleware';

export const ordersRouter = Router();

ordersRouter.use(protect);

ordersRouter.post('/', schemaValidation(orderSchema), createOrder);

ordersRouter.get('/me', findUserOrders);

ordersRouter
  .use('/:id', schemaValidation(idParamsSchema), verifyOrder)
  .route('/:id')
  .patch(completeOrder)
  .delete(cancellOrder);
