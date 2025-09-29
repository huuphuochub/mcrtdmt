import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seller } from "src/seller/seller.entity";
import { User } from "src/users/user.entity";
@Entity('chat')

export class Roomchat{
    @PrimaryGeneratedColumn()
    id:number;


    @ManyToOne(() => User,(user) => user.id,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user:User


    @ManyToOne(() => Seller,(seller) => seller.id,{onDelete:'CASCADE'} )
    @JoinColumn({name:'seller_id'})
    seller:Seller


    @Column()
    lastmessage:string;

    @Column({default:''})
    userlast:string;

    @Column()
    status:number;

    
    @Column({ 
  type: 'timestamp', 
  default: () => 'CURRENT_TIMESTAMP', 
  onUpdate: 'CURRENT_TIMESTAMP' 
})
date: Date;

}