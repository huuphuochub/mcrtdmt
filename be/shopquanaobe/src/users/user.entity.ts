import { Entity, PrimaryGeneratedColumn, Column,OneToOne } from 'typeorm';
import { Seller } from 'src/seller/seller.entity';

@Entity('users') // 👈 bảng tên là 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column({default:null})
  avatarUrl: string;

  @Column()
  password: string;

  @Column({default:0})
  role: number;

  @Column({default:0})
  districtId:number;

  @Column({default:0})
  provinceId:number;

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
} 
