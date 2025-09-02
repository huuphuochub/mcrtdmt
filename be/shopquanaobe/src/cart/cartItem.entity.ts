import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity('cartitem')
export class CartItem{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    @JoinColumn({ name: 'cart_id' }) // Chỉ định cột nào là khóa ngoại
    cart: Cart; // Khai báo thuộc tính là một đối tượng Cart

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