import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Product } from "src/product/product.entity";
@Entity('comment')
export class Comment{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user_id:number;

    @ManyToOne(() => Product, product => product.comments,{onDelete: "CASCADE"})
    @JoinColumn({name:'product_id'})
    product:Product

    // @Column()
    // product_id:number;
    @RelationId((comment: Comment) => comment.product)
    product_id: number;


    @Column()
    star:number;

    @Column()
    content:string;

    @CreateDateColumn()
    createAt:Date;



}