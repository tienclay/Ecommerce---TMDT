import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ProductAttributeType {
  COLOR = 'color',
  SIZE = 'size',
}

@Entity()
export class ProductAttribute extends BaseEntity {
  @Column({ type: 'enum', enum: ProductAttributeType })
  type: ProductAttributeType;

  @Column({ type: 'varchar', length: 255 })
  value: string;
}
