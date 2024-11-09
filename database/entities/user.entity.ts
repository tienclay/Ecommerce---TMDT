import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PhoneCode, UserStatus } from '@enums';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ['CLIENT', 'ADMIN'], default: 'CLIENT' })
  role: string;

  @Column({ type: 'date', nullable: true })
  birthOfDate: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: PhoneCode })
  phoneCode: PhoneCode;

  @Column({ type: 'enum', enum: UserStatus })
  status: UserStatus;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string;
}
