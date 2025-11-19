import { Seller } from "src/seller/seller.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { History } from "./hisstory.entity";
import { Bank } from "./bank.entity";

@Entity('wallet')
export class Wallet{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(() => Seller, seller => seller.wallet)
    @JoinColumn({name:'seller_id'})
    seller:Seller


    @Column()
    availableBalance:number;

    @OneToMany(() => History,history => history.wallet ,{ cascade: true })
    history:History[];

    @OneToMany(() => Bank,bank => bank.wallet, {cascade:true})
    bank:Bank[];
}