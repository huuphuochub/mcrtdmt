import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cartItem.entity";

@Entity("cart")
export class Cart{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    id_user:number;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItems: CartItem[]; // Khai báo một mảng các CartItem
    
}