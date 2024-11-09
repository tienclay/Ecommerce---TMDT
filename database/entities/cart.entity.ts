import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'decimal' })
  total: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
