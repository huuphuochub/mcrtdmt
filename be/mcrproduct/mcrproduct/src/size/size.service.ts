import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './size.entity';
import { Repository } from 'typeorm';
import { ProductVariants } from './product_variants.entity';
// import { ProductVariants } from './product_variants.entity';

@Injectable()
export class SizeService {

    constructor(
            @InjectRepository(Size)
            private sizeRepo:Repository<Size>,
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
}
