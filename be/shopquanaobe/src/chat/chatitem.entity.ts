import { Seller } from "src/seller/seller.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roomchat } from "./chat.entity";
@Entity('chatitem')
export class ChatItem{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Roomchat, room => room.id,{onDelete:'CASCADE'}   )
    @JoinColumn({ name: 'room_id' })
    room: Roomchat;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Seller, { nullable: true })
    @JoinColumn({ name: 'seller_id' })
    seller: Seller;


    @Column()
    message:string;

    @Column()
    status:number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column("simple-array", { nullable: true })
    imageurl:string[];

    @Column("simple-json", { nullable: true })
    tag: { id: number; name: string; image: string };
 // là product_id, sẽ fetch sản phẩm khi tag khác 0
}