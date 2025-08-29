import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order")
export class Order {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user_id:number;

    @Column()
    total_amount:number;

    @Column()
    status:string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    payment_method:number;

}
