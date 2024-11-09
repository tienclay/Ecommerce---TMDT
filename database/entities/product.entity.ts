import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SubCategory } from './sub-category.entity';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  summary: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover: string;

  @ManyToOne(() => SubCategory)
  category: SubCategory;
}
