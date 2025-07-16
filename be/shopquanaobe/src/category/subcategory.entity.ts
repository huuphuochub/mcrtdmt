// subcategory.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' }) // để ánh xạ khóa ngoại vào DB


 @Column()
  categoryId: number;

  category: Category;
}
