import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  AfterInsert,
  BeforeRemove,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Like } from './like.entity';
import { connectionSource } from 'ormconfig';
import { EcommerceNotAcceptableException } from '@exceptions';

@Entity('statuses')
export class Status extends BaseEntity {
  @Column()
  userId: string;

  @Column({ type: 'text' })
  @Expose()
  content: string;

  @Column({ nullable: true })
  parentStatusId?: string;

  @Column({ default: 0 })
  @Expose()
  likesCount: number;

  @Column({ default: 0 })
  @Expose()
  repliesCount: number; // Add repliesCount column

  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.statuses, {
    onDelete: 'CASCADE',
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
