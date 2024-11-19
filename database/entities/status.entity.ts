// src/entities/status.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Like } from './like.entity';

@Entity('statuses')
export class Status extends BaseEntity {
  @Column()
  user_id: string;

  @Column({ type: 'text' })
  @Expose()
  content: string;

  @Column({ nullable: true })
  parent_status_id?: string;

  @Column({ default: 0 })
  @Expose()
  likes_count: number;

  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.statuses, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Self-referencing Many-to-One for parent status
  @ManyToOne(() => Status, (status) => status.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_status_id' })
  parentStatus?: Status;

  // One-to-Many for replies
  @OneToMany(() => Status, (status) => status.parentStatus)
  replies: Status[];

  // One-to-Many with Like
  @OneToMany(() => Like, (like) => like.status, {
    cascade: true,
  })
  likes: Like[];
}
