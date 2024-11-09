import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  product: Product;
}
