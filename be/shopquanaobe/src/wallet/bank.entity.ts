import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity('bank')
export class Bank{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Wallet,wallet => wallet.bank)
    @JoinColumn({name:'wallet_id'})
    wallet:Wallet;

    @Column()
    namebank:string;

    @Column()
    account_number:string;

    @Column()
    account_name:string;


    @Column()
    image:string;

}