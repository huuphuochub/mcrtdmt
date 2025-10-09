import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seller } from "./seller.entity";
import { User } from "src/users/user.entity";
// import
@Entity('commentseller')
export class CommentSeller{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    @Column()
    star:number;

      @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // @Column()
  // seller_id:number;

  @ManyToOne(() => Seller,seller => seller.comments)
  @JoinColumn({name:'seller_id'})
  seller:Seller;

  @ManyToOne(() => User,user => user.commentseller)
  @JoinColumn({name:"user_id"})
  user:User;

  // @Column()
  // user_id:number;

      @Column("simple-array", { nullable: true })
    imageurl:string[];

//   @OneToMany(() => )
    
}
