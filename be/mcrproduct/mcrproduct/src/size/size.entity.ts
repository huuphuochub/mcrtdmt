import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { ProductVariants } from "./product_variants.entity";

@Entity('size')
export class Size {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    note:string


    @OneToMany(() => ProductVariants, variant => variant.size)
  variants: ProductVariants[];

}