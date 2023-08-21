import { ObjectLiteral } from 'typeorm';
import { EntityService } from '../../services/entity.service';
import {
  mealService,
  userService,
} from '../../services/factory/entities.factory';
import { FindResult, FindResults } from '../../types/service.types';
import { UserModel } from '../users/users.model';
import { OrderModel } from './orders.model';
import { OrderRepository } from './types/order.types';
import { OrderStatus } from './types/order.types';
import { MealModel } from '../meals/meals.model';
import { orderDto, ordersDto } from './order.dto';

export class OrderService {
  private orderRepository: OrderRepository;
  private entityService: EntityService;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
    this.entityService = new EntityService(orderRepository);
  }

  async findUserOrders(userId: number): Promise<FindResults | any> {
    const filters = {
      user: { id: userId },
    };
    const attributes = { id: false };
    const relationAttributes = { meal: { restaurant: true }, user: true };
    const [orders, results] = await this.entityService.findAll(
      filters,
      attributes,
      relationAttributes
    );

    return {
      orders: ordersDto(orders),
      results,
    };
  }

  async findOrder(
    id: number,
    userId: number,
    attributes: object | false,
    relationAttributes: object | false
  ): Promise<FindResult> {
    const filters = {
      id,
      user: { id: userId },
    };
    const order = await this.entityService.findOne(
      filters,
      attributes,
      relationAttributes,
      true
    );

    return orderDto(order as OrderModel);
  }

  async createOrder(
    userId: number,
    order: ObjectLiteral & OrderModel
  ): Promise<FindResult> {
    const meal = mealService.findMeal(order.mealId, false);
    const user = userService.findOneUser({ id: userId }, false, false, true);

    const [mealFound, userFound] = await Promise.all([meal, user]);

    order.meal = mealFound as MealModel;
    order.user = userFound as UserModel;
    order.totalPrice = mealFound?.price * order.quantity;

    const orderCreated = await this.entityService.create(order);

    return orderDto(orderCreated);
  }

  async completeOrder(id: number): Promise<OrderModel> {
    const order = { id, status: OrderStatus.completed };
    const orderCompleted = await this.orderRepository.save(order, {
      listeners: false,
    });

    return orderCompleted;
  }

  async cancellOrder(id: number): Promise<FindResult> {
    const order = { id, status: OrderStatus.cancelled };
    return await this.orderRepository.save(order, { listeners: false });
  }
}
