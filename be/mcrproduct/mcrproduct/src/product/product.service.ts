import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './product.dto';


interface PaginationOptions{
  limit:number;
  page:number;
}

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepo:Repository<Product>,


    ){}


    
// them san pham
    async addProduct(dto: CreateProductDto) {
          // console.log(dto);

  try {
    const newProduct = this.productRepo.create(dto);
    const result = await this.productRepo.save(newProduct);
    // console.log('Product created:', result);
    return {
      success: true,
      data: result,
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


// lay tat ca san pham

  async getAllproduct(){
    try {
      const result = await this.productRepo.find()
      return {
      success: true,
      data: result,
    };
    } catch (error) {
      
    }
  }
// lay san pham theeo nguoi ban
  async getBeseller(option:PaginationOptions){
    try {
      const [products, total]  = await this.productRepo.findAndCount({
         order: { totalsold: 'DESC' },
      take: option.limit,
      skip: option.page * option.limit,
      })
      return {
      success: true,
      data: products,
    };
    } catch (error) {
      
    }
  }
  // lay chi tiet san pham
  async getProductdetail(id:number){
    try {
      const product=  await this.productRepo.findOneBy({id:id});
      if(!product){
         return {
        success: false,
        message: "Không tìm thấy sản phẩm",
        data: null,
      };
      }
      return {
        success:true,
        data:product,
      }
    } catch (error) {
      return {
      success: false,
      message: "Đã có lỗi xảy ra khi lấy sản phẩm",
      data: null,
    };
    }
  }

  // lay san pham thoe danh muc
  async getProductbycategory(id:number) {
    try {
      const products = await this.productRepo.find({where:{idCategory:id}})
      if(!products){
        return{
          success:false,
          message:'khong tim thay san pham nao',
          data:null,
        }
       
      }
      return{
        success:true,
        data:products,
      }
    } catch (error) {
      return{
        success:false,
        message:error,
        data:null,
      }
    }
  }

// lay tat ca san pham theo subcate
  async getProductbysubcate(id:number){
    try {
      const products = await this.productRepo.find({where:{subcategory:id}})
      if(!products){
        return{
          success:false,
          data:null,
          message:'khong tim thays san pham nao'
        }

      }
      return{
        success:true,
        data:products
      }
    } catch (error) {
      return{
        message:'loi',
        success:false,
        data:null
      }
    }
  }

  async countproduct(id_seller:number){
   try {
    const total = await this.productRepo.count({
      where: { idSeller: id_seller },
    });
    return total;
  } catch (error) {
    throw error;
  }
  }


  async Getbatch(ids:number[]){
    try {
      const products = await this.productRepo.findBy({ id: In(ids)})
      return products;
    } catch (error) {
      
    }
  }



   async searchProductsService(body:any) {
    const take = 12;
    const skip = (body.page - 1) * take;

    const [products, total] = await this.productRepo
      .createQueryBuilder('product')
      .where(
        `unaccent(lower(product.name)) LIKE unaccent(lower(:keyword))`,
        { keyword: `%${body.keyword}%` },
      )
      .orderBy('product.id', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

      // console.log(products);
      

    return {
      data: products,
      total,
      currentPage: body.page,
      totalPages: Math.ceil(total / take),
    };
  }

    async UpdateRating(body: any) {
      try {
        const pr = await this.productRepo.findOne({
          where: { id: body.product_id },
        });

        if (!pr) {
          throw new Error("Product not found");
        }

        pr.ratingSum = (pr.ratingSum || 0) + body.star;
        pr.ratingCount = (pr.ratingCount || 0) + 1;

        await this.productRepo.save(pr);
        return pr;
      } catch (error) {
        console.error("UpdateRating error:", error);
        throw error;
      }
    }

}
