import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Seller } from "src/seller/seller.entity";

@Entity("orderitem") 
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_product: number;

  @Column({default:0})
  seller_id:number;

  @Column()
  quantity: number;

  @Column()
  unitprice: number;

  @Column()
  productname:string;

  @Column()
  color_id: number;

@UpdateDateColumn()
  updated_at: Date; // mỗi lần update thì tự động đổi thời gian

  @Column()
  size_id: number;

  @Column({default:0})
  status:number

  @Column({default:null})
  cancel_reason:string

  @ManyToOne(() => Order, order => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" }) // khóa ngoại
  order: Order;

      @ManyToOne(() => Seller, seller => seller.items)
@JoinColumn({ name: "seller_id" })
seller: Seller;
}
