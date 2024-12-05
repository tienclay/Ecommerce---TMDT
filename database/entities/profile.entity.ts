// src/entities/profile.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { PhoneCode } from '@enums';

export enum DegreeType {
  BACHELOR = 'Bachelor',
  MASTER = 'Master',
  PHD = 'PhD',
}
@Entity('profiles')
export class Profile extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName?: string;

  @Column({ type: 'enum', enum: DegreeType, nullable: true })
  degree?: DegreeType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  experienceYears?: number;

  @Column({ type: 'text', nullable: true })
  @Expose()
  bio?: string;

  @Column({ type: 'varchar', nullable: true })
  @Expose()
  address?: string;

  @Column({ type: 'date', nullable: true })
  birthOfDate: Date;

  @Column({ type: 'enum', enum: PhoneCode, nullable: true })
  phoneCode?: PhoneCode;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Expose()
  phoneNumber?: string;

  @Column({ type: 'uuid' })
  @Expose()
  userId: string;

  // One-to-One with User
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
