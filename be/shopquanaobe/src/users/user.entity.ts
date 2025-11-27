import { Entity, PrimaryGeneratedColumn, Column,OneToOne, OneToMany } from 'typeorm';
import { Seller } from 'src/seller/seller.entity';
import { HistorySearch } from 'src/historysearch/historysearch.entity';
import { Notification } from 'src/noti/noti.entity';
import { Order } from 'src/order/order.entity';
import { CommentSeller } from 'src/seller/commentseller.entity';

@Entity('users') // 👈 bảng tên là 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column({default:'https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png'})
  avatarUrl: string;

  @Column()
  password: string;

  @Column({default:0})
  role: number;

  @Column({default:0})
  districtId:number;

  @Column({default:0})
  provinceId:number;

  @Column({default:""})
  email:string;


   @OneToMany(() => Order, order => order.user)
  orders: Order[];


  @Column({default:null})
  phoneorder:string;

  @Column({default:0})
  wardsId:number;

  @Column({default:null})
  address:string;
    
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Seller, seller => seller.user, { nullable: true })
  seller?: Seller; // optional

  @OneToMany(() => HistorySearch,search => search.user,{nullable:true})
  searchs?: HistorySearch[];

    @OneToMany(() => Notification, (noti) => noti.user)
  notifications: Notification[];

  @OneToMany(() => CommentSeller,commentseller => commentseller.id)
  commentseller:CommentSeller[];

} 
