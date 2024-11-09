import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { ProductAttribute } from './product-attribute.entity';

@Entity()
export class ProductSKU extends BaseEntity {
  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => ProductAttribute)
  sizeAttribute: ProductAttribute;

  @ManyToOne(() => ProductAttribute)
  colorAttribute: ProductAttribute;

  @Column({ type: 'varchar', length: 100 })
  sku: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;
}
