import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
@Entity('favourite')
export class Favourite{
    @PrimaryGeneratedColumn()
    id:number;


    @ManyToOne(() => Product,product=>product.favourite)
    @JoinColumn({name:'product_id'})
    product:Product


    @Column()
    user_id:number;

    // @Column()

}