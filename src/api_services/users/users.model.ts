import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { email } from '../../types/global.types';
import { UserRole, UserStatus } from './types/user.types';
import { OrderModel } from '../orders/orders.model';
import { ReviewModel } from '../reviews/reviews.model';

@Entity({ name: 'users' })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 65 })
  name: string;

  @Column({ type: 'varchar', length: 60, unique: true })
  email: email;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'varchar',
    enum: UserStatus,
    default: UserStatus.available,
  })
  status: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.normal,
  })
  role: UserRole;

  @Column({
    type: 'date',
    nullable: true,
    name: 'password_changed_at',
  })
  passwordChangedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((_type) => OrderModel, (order) => order.user)
  orders: OrderModel[];

  @OneToMany((_type) => ReviewModel, (review) => review.user)
  reviews: ReviewModel[];
}
