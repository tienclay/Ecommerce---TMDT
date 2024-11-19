// src/entities/profile.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('profiles')
export class Profile extends BaseEntity {
  @Column()
  @Expose()
  name: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  bio?: string;

  @Column({ nullable: true })
  @Expose()
  address?: string;

  @Column({ nullable: true })
  @Expose()
  phone_number?: string;

  @Column({ nullable: true })
  @Expose()
  avatar_url?: string;

  // One-to-One with User
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
