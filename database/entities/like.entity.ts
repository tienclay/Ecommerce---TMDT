// src/entities/like.entity.ts

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Status } from './status.entity';

@Entity('likes')
export class Like extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  statusId: string;

  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Many-to-One with Status
  @ManyToOne(() => Status, (status) => status.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'status_id' })
  status: Status;
}
