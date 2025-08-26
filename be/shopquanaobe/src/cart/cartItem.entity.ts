import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cartitem')
export class CartItem{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    cart_id:number

    @Column()
    product_id:number;

    @Column()
    color_id:number;

    @Column()
    size_id:number;

    @Column()
    quantity:number;

    

}