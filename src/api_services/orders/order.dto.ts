import { ObjectLiteral } from 'typeorm';
import { OrderModel } from './orders.model';
import { mealDto } from '../meals/meal.dto';
import { userDto } from '../users/user.dto';

export const orderDto = (order: OrderModel | ObjectLiteral) => {
  return {
    totalPrice: order.totalPrice,
    quantity: order.quantity,
    status: order.status && order.status,
    meal: order.meal && mealDto(order.meal),
    user: order.user && userDto(order.user),
  };
};

export const ordersDto = (orders: OrderModel[] | ObjectLiteral[]) => {
  return orders.map((order: OrderModel | ObjectLiteral) => {
    return {
      totalPrice: order.totalPrice,
      quantity: order.quantity,
      status: order.status,
      meal: order.meal && mealDto(order.meal),
      user: order.user && userDto(order.user),
    };
  });
};
