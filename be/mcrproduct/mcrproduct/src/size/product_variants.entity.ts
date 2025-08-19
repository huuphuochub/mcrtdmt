import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "src/product/product.entity";
import { Color } from "./color.entity";
import { Size } from "./size.entity";

@Entity('product_variants')
export class ProductVariants {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Color, color => color.variants)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @ManyToOne(() => Size, size => size.variants)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @Column()
  quantity: number;

}