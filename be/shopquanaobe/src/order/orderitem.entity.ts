import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity('orderitem')
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    id_product:number;

    @Column()
    quantity:number;

    @Column()
    price:number;

    @Column()
    color_id:number;

    @Column()
    size_id:number;

    @Column()
    order_id:number;

}