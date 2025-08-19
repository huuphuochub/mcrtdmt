import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { ProductVariants } from "./product_variants.entity";

@Entity('color')
export class Color {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;



    @OneToMany(() => ProductVariants, variant => variant.color)
  variants: ProductVariants[];

}