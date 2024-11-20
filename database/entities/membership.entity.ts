// src/entities/membership.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Payment } from './payment.entity';

export enum MembershipType {
  BASIC = 'Basic',
  PREMIUM = 'Premium',
  VIP = 'VIP',
}

@Entity('memberships')
export class Membership extends BaseEntity {
  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: MembershipType,
    default: MembershipType.BASIC,
  })
  @Expose()
  membershipType: MembershipType;

  @Column({ type: 'date' })
  @Expose()
  startDate: Date;

  @Column({ type: 'date' })
  @Expose()
  endDate: Date;

  @Column({ nullable: true })
  paymentId: string;

  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // One-to-One with Payment
  @OneToOne(() => Payment, (payment) => payment.membership, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;
}
