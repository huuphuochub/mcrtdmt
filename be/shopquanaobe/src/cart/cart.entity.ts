import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class Cart{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    id_user:number;


    
}