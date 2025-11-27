import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('outbox')
export class Outbox{
    @PrimaryGeneratedColumn()
    id:number;
    

    @Column()
    eventType:string;

    @Column('json')
    payload: {
    items: {
      product_id: number;
      color_id: number;
      size_id: number;
      quantity: number;
    }[];
  };

  @Column({ default: false })
  processed: boolean;

   @Column({ default: 0 })
  retryCount: number;

  @Column({ type: 'text', nullable: true })
  lastError: string;

  @Column('jsonb', { nullable: true })
  errorHistory: any;

  @CreateDateColumn()
  createdAt: Date;

}