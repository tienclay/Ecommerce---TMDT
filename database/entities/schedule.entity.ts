// src/entities/schedule.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Location } from './location.entity';

@Entity('schedules')
export class Schedule extends BaseEntity {
  @Column()
  userId: string;

  @Column({ type: 'timestamp' })
  @Expose()
  availableFrom: Date;

  @Column({ type: 'timestamp' })
  @Expose()
  availableTo: Date;

  @Column({ nullable: true })
  locationId?: string;

  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Many-to-One with Location
  @ManyToOne(() => Location, (location) => location.schedules, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'location_id' })
  location?: Location;
}
