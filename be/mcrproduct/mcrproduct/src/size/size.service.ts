import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './size.entity';
import { In, Repository } from 'typeorm';
import { ProductVariants } from './product_variants.entity';
import { Color } from './color.entity';
// import { ProductVariants } from './product_variants.entity';

@Injectable()
export class SizeService {

    constructor(
            @InjectRepository(Size)
            private sizeRepo:Repository<Size>,

            @InjectRepository(Color)
            private colorrepo:Repository<Color>,
            // private productVariantsrepo:Repository<ProductVariants>
    

            @InjectRepository(ProductVariants)
        private productVariantsrepo: Repository<ProductVariants>
        ){}
    
    async getsizebyidprd(id:number) {
        // console.log(id);
        
        try {
           const variants = await this.productVariantsrepo.find({
                where: { product: { id: id } },
                relations: ['size', 'color'],
                });
                if(!variants || variants.length === 0){
                    return{
                        success:false,
                        message:'khong co size',
                        data:null,
                    }
                }
                return {
                  success:true,
                  data:variants,
                  message:'ok'
                }
        } catch (error) {
            return{
                message: error instanceof Error ? error.message : String(error),
                success:false,
                data:null,
            }
        }
    }

    async Getbatch(ids:number[]){
        try {
          const products = await this.sizeRepo.findBy({ id: In(ids)})
         return products
        } catch (error) {
          
        }
      }

      async Getbatchcolor(ids:number[]){
    try {
      const products = await this.colorrepo.findBy({ id: In(ids)})
      return products;
    } catch (error) {
      
    }
  }

  async GetSizeColor(){
    try {
      const size = await this.sizeRepo.find();
      const color = await this.colorrepo.find();

      return{
        success:true,
        data:{
          size,color
        },
        message:'ok'
      }
    } catch (error) {
      return{
        success:false,
        data:null,
        message:'loi service'
      }
    }
  }

  async UpdateQuantityVariant(body:any){
    try {
    for (const element of body.variant) {
      await this.productVariantsrepo.decrement(
        {
          product: { id: Number(element.product_id) },
          color: { id: Number(element.color_id) },
          size: { id: Number(element.size_id) },
        }, // điều kiện where
        "quantity", // cột cần trừ
        element.quantity // số lượng cần trừ
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
    
  }


 async upsertProductVariants(variants: {
      product_id: number;
      size_id: number;
      color_id: number;
      quantity: number;
    }[],
  ) {
    const results: ProductVariants[] = [];

    for (const v of variants) {
      // Kiểm tra xem biến thể đã tồn tại chưa
      const exist = await this.productVariantsrepo.findOne({
        where: {
          product: { id: v.product_id },
          size: { id: v.size_id },
          color: { id: v.color_id },
        },
        relations: ["product", "size", "color"], // để tránh lỗi entity quan hệ undefined
      });

      if (exist) {
        // Nếu tồn tại → cập nhật số lượng
        exist.quantity = v.quantity;
        const saved = await this.productVariantsrepo.save(exist);
        results.push(saved);
      } else {
        // Nếu chưa tồn tại → tạo mới
        const newVariant = this.productVariantsrepo.create({
          product: { id: v.product_id },
          size: { id: v.size_id },
          color: { id: v.color_id },
          quantity: v.quantity,
        });

        const saved = await this.productVariantsrepo.save(newVariant);
        results.push(saved);
      }
    }

    return {
      message: "Upsert variants success",
      count: results.length,
      data: results,
      success:true,
    };
  }


}
