import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";
@Entity('historysearch')
export class HistorySearch{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    keyword:string;

    @ManyToOne(() => User, user => user.searchs,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user:User;

    @Column()
    user_id:number;

    @CreateDateColumn()
    createdAt: Date;
    
}
