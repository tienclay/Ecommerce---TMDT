// src/entities/location.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { Schedule } from './schedule.entity';

@Entity('locations')
export class Location extends BaseEntity {
  @Column()
  @Expose()
  addressLine1: string;

  @Column({ nullable: true })
  @Expose()
  addressLine2?: string;

  @Column()
  @Expose()
  city: string;

  @Column()
  @Expose()
  state: string;

  @Column()
  @Expose()
  zipCode: string;

  @Column()
  @Expose()
  country: string;

  // One-to-Many with Course
  @OneToMany(() => Course, (course) => course.location, {
    cascade: true,
  })
  courses?: Course[];

  // One-to-Many with Schedule
  @OneToMany(() => Schedule, (schedule) => schedule.location, {
    cascade: true,
  })
  schedules?: Schedule[];
}
