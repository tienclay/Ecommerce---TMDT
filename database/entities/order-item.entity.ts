import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderDetails } from './order-details.entity';
import { Product } from './product.entity';
import { ProductSKU } from './product-sku.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @ManyToOne(() => OrderDetails)
  order: OrderDetails;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => ProductSKU)
  productSKU: ProductSKU;

  @Column({ type: 'int' })
  quantity: number;
}
