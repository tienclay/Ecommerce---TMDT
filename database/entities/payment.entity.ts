// src/entities/payment.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';
import { Membership } from './membership.entity';
import { User } from './user.entity';

export enum PaymentMethod {
  CREDIT_CARD = 'Credit Card',
  PAYPAL = 'PayPal',
  BANK_TRANSFER = 'Bank Transfer',
}

export enum PaymentStatus {
  SUCCESS = 'Success',
  FAILED = 'Failed',
  PENDING = 'Pending',
}

@Entity('payments')
export class Payment extends BaseEntity {
  @Column()
  order_id: string;

  @Column({ nullable: true })
  membership_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Expose()
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  payment_date: Date;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CREDIT_CARD,
  })
  @Expose()
  payment_method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  @Expose()
  status: PaymentStatus;

  // One-to-One with Order
  @OneToOne(() => Order, (order) => order.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // One-to-One with Membership
  @OneToOne(() => Membership, (membership) => membership.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;

  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
