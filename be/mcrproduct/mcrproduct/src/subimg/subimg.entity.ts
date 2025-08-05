import { Product } from "src/product/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";


@Entity('subimg')
export class Subimg {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    product_id:number;

    @Column()
    url:string;

   @ManyToOne(() => Product, (product) => product.subImages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    


}