import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity('history')

export class History{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Wallet,wallet => wallet.history)
    @JoinColumn({name:"wallet_id"})
    wallet:Wallet;

    @Column()
    total_amount:number;

    @Column()
    type:number;

    @Column()
    status:number;

    @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}