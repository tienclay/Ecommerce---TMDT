// src/entities/schedule.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Location } from './location.entity';

@Entity('schedules')
export class Schedule extends BaseEntity {
  @Column()
  user_id: string;

  @Column({ type: 'timestamp' })
  @Expose()
  available_from: Date;

  @Column({ type: 'timestamp' })
  @Expose()
  available_to: Date;

  @Column({ nullable: true })
  location_id?: string;

  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.schedules, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Many-to-One with Location
  @ManyToOne(() => Location, (location) => location.schedules, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'location_id' })
  location?: Location;
}
