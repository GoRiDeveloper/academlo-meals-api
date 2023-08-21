import { Repository } from 'typeorm';
import { OrderModel } from '../orders.model';

export enum OrderStatus {
  active = 'active',
  cancelled = 'cancelled',
  completed = 'completed',
}
export type OrderRepository = Repository<OrderModel>;
