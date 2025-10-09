import { Subimg } from "src/subimg/subimg.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { Color } from "src/size/color.entity";
import { Size } from "src/size/size.entity";
import { ProductVariants } from "src/size/product_variants.entity";
import { Comment } from "src/comment/comment.entity";
import { Favourite } from "./favouriteproduct.entity";
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
    idCategory:number;

    @Column()
    subcategory:number;

    @Column()
    date:Date;

    @Column()
    status:number;


    // tổng số sao
    @Column({default:0})
    ratingSum:number;

    // số lượng đánh giá
    @Column({default:0})
    ratingCount:number;

    @Column({default:0,type: 'decimal'})
    averageRating:number;

    @OneToMany(() => Subimg, (Subimg) => Subimg.product)
    subImages: Subimg[];
    
    @Column({default:0,nullable:true})
    discountprice:number;

    @Column({default:0,nullable:true})
    quantity:number;

    @Column({default:0,nullable:true})
    totalsold:number;

    @Column({default:0})
    discount:number;


    @Column({default:0,nullable:true})
    weigth:number;

    @OneToMany(() => ProductVariants, variant => variant.product)
  variants: ProductVariants[];

  @OneToMany(() => Comment, comment => comment.product,{cascade:true})
  comments:Comment[];

    @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @OneToMany(() => Favourite,favourite=> favourite.product)
  favourite:Favourite[]

  @Column({default:'2025-10-20 16:30:58.170258+07'})
  promo_end:string;
 
  @Column({default:'2025-10-01 16:30:58.170258+07'})
  promo_start:string
//    @OneToMany(() => Color, (color) => color.products)
//   colors: Color[];


//    @OneToMany(() => Size, (size) => size.products)
//   sizes: Color[];



}