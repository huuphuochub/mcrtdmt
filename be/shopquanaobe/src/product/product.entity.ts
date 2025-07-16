import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    image:string;

    @Column()
    idSeller:number;

    @Column()
    describe:string;

    @Column()
    price:number;
    
    @Column()
    discountprice:number;

    @Column()
    idCategory:number;

    @Column()
    subcategory:number;

    @Column()
    date:Date;

    @Column()
    status:number;

    @Column()
    origin:number;

    @Column()
    producttion:Date;

    @Column({default:0})
    ratingSum:number;

    @Column({default:0})
    ratingCount:number;

    @Column({default:0})
    averageRating:number;

    


}