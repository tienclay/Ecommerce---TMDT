import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class OrderDetails extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'decimal' })
  total: number;
}
