import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follower {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user_id:number;

    @Column()
    seller_id:number;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;


}