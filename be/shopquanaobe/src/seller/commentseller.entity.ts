import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

//   @OneToMany(() => )
    
}
