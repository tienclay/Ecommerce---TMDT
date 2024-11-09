import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Cart } from './cart.entity';
import { Product } from './product.entity';
import { ProductSKU } from './product-sku.entity';

@Entity()
export class CartItem extends BaseEntity {
  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => ProductSKU)
  productSKU: ProductSKU;

  @Column({ type: 'int' })
  quantity: number;
}
