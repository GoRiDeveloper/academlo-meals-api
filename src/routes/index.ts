import { Router } from 'express';
import { usersRouter } from '../api_services/users/users.router';
import { restaurantsRouter } from '../api_services/restaurants/restaurants.router';
import { ordersRouter } from '../api_services/orders/orders.router';
import { mealsRouter } from '../api_services/meals/meals.router';
import { pathNotFound } from '../middlewares/path.not.found.middleware';

export const router = Router();

router.use('/users', usersRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/meals', mealsRouter);
router.use('/orders', ordersRouter);

router.all('*', pathNotFound);
