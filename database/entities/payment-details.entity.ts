import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderDetails } from './order-details.entity';

@Entity()
export class PaymentDetails extends BaseEntity {
  @ManyToOne(() => OrderDetails)
  order: OrderDetails;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar', length: 100 })
  provider: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;
}
