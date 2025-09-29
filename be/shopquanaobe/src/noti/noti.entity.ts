import { Seller } from "src/seller/seller.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ nullable: true })
  user_id?: number;


  @ManyToOne(() => Seller, seller => seller.notifications, { nullable: true })
  @JoinColumn({ name: 'seller_id' })
  seller?: Seller;

  @Column({ nullable: true })
  seller_id?: number;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
