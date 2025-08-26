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
                return variants
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
}
