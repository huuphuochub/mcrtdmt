import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./orderitem.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ unique: true })
  ordercode:number;

  @Column()
  total_amount: number;

  @Column()
  phone:string;

  @Column({default:""})
  note:string; 

  @Column()
  address:string;

  @Column()
  status: number;

  @Column({default:null})
  email:string;
 
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  payment_method: number;

    @Column()
    ship_fee:number;

    @Column({default:false})
    emailsend:boolean

    @Column({default:0})
    payable_amount:number;


  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];
}
