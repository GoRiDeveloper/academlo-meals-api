import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity({ name: 'Errors' })
export class ErrorModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'error_id' })
  errorId: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  message: string;

  @Column({ type: 'text', nullable: true })
  stack: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;
}
