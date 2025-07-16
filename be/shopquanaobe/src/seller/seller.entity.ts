import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('sellers') // 👈 bảng tên là 'users'
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // 👈 khóa ngoại
  user: User;

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

    
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  
  @Column()
  status:number;
}
