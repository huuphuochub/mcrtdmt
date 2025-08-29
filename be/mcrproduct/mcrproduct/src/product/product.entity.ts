import { Subimg } from "src/subimg/subimg.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Color } from "src/size/color.entity";
import { Size } from "src/size/size.entity";
import { ProductVariants } from "src/size/product_variants.entity";

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

    @Column({default:0})
    ratingSum:number;

    @Column({default:0})
    ratingCount:number;

    @Column({default:0})
    averageRating:number;

    @OneToMany(() => Subimg, (Subimg) => Subimg.product)
    subImages: Subimg[];
    
    @Column({default:0,nullable:true})
    discountprice:number;

    @Column({default:0,nullable:true})
    quantity:number;

    @Column({default:0,nullable:true})
    totalsold:number;


    @Column({default:0,nullable:true})
    wreigth:number;

    @OneToMany(() => ProductVariants, variant => variant.product)
  variants: ProductVariants[];
//    @OneToMany(() => Color, (color) => color.products)
//   colors: Color[];


//    @OneToMany(() => Size, (size) => size.products)
//   sizes: Color[];



}