// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class SubimgService {}


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subimg } from './subimg.entity';
import { Repository } from 'typeorm';
import { CreateSubimgtDto } from './subimg.dto';

@Injectable()
export class SubimgService {

    constructor(
        @InjectRepository(Subimg)
        private subimgRepo:Repository<Subimg>,


    ){}

    async addSubimg(dto: CreateSubimgtDto) {
        console.log(dto);
        
      try {
        const {id_product,url} = dto;
        for(const urls of url){
            const exits = await this.subimgRepo.findOne({where:{url:urls,product_id:id_product},})

            if(exits){
                continue;
            }
            const newSubimg = this.subimgRepo.create({
                url:urls,
                product_id:id_product
            })

            await this.subimgRepo.save(newSubimg);
        }
        return {
          success: true, 
          data:""
        };
      } catch (error) {
        console.error('Error creating product:', error);

        // Nếu là lỗi từ Postgres (QueryFailedError), có thể xử lý cụ thể hơn
        if (error.code === '23505') {
          // 23505 = unique_violation
          throw new Error('Tên sản phẩm đã tồn tại');
        }

        throw new Error('Lỗi khi thêm sản phẩm');
      }
    }

    async getSubimgbyid(id:number) {
      try {
        const subimg = await this.subimgRepo.findBy({product_id:id})
        if (!subimg || subimg.length === 0) {
      return {
        success: false,
        message: "không có ảnh phụ",
        data: []
      };
    }
        return {
        success:true,
        data:subimg,
      }
      } catch (error) {
        return {
          success:false,
          message:'loi khi lay hinh anh',
          data : null,
        }
      }
    }
}
