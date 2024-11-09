import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Entity()
export class SubCategory extends BaseEntity {
  @ManyToOne(() => Category)
  parentCategory: Category;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
