import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CommentSeller } from './commentseller.entity';
import { Notification } from 'src/noti/noti.entity';
@Entity('sellers') // 👈 bảng tên là 'users'
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number; // Để query nhanh

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // 👈 khóa ngoại
  user: User;

  @Column({default:null})
  avatar:string

  

  @Column()
  usernameseller: string;

  @Column()
  email: string;


   @Column({default:0})
  districtId:number;

  @Column({default:0})
  provinceId:number;

  @Column({default:0})
  wardsId:number;

  @Column({default:null})
  address:string;

  @Column({default:null})
  urlfb:string;

  @Column({default:null})
  urltiktok:string;

  @Column({default:null})
  describe:string;

  @Column({default:null})
  phone:string

    
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  
  @Column()
  status:number;

    // tổng số lượt đánh giá
  @Column({default:0})
  ratingCount:number;


    //tổng số sao đánh giá
  @Column({default:0})
  ratingSum:number;

  @Column({ default: 0 })
  soldCount: number;

  @Column({default:0})
  follower:number;

  @Column({default:0})
  totalproduct:number

  @OneToMany(() => CommentSeller,commentseller => commentseller.id)
  comments:CommentSeller[];


   @OneToMany(() => Notification, (noti) => noti.seller)
    notifications: Notification[];
}
