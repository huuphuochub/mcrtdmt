import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

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

  @Column()
  size_id: number;

  @ManyToOne(() => Order, order => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" }) // khóa ngoại
  order: Order;
}
