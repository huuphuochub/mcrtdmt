import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './product.dto';
import { Favourite } from './favouriteproduct.entity';

interface PaginationOptions{
  limit:number;
  page:number;
}

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepo:Repository<Product>,

        @InjectRepository(Favourite)
        private favouriteRepo:Repository<Favourite>,


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

  async getAllproduct(limit:number,page:number){
    try {
      const take = limit || 12;
      const skip = (page - 1) * take;

      const [result] = await this.productRepo.findAndCount({
        skip,
        take,
        order:{
          createdAt:'DESC'
        },
      })
      return {
      success: true,
      data: result,
    };
    } catch (error) {
      
    }
  }

  // lay danh sach san pham theo seller de seller xem

    async getAllproductseller(limit:number,page:number,seller_id:number){
    try {
      const take = limit || 12;
      const skip = (page - 1) * take;

      const [result] = await this.productRepo.findAndCount({
        where:{
          idSeller:seller_id
        },
        skip,
        take,
        order:{
          createdAt:'DESC'
        },
      })
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


    async FilterUser(body:any){
      const take = 12;
      const skip = (body.page - 1) * take;
      const category = body.category
      const subcate = body.subcate
      
      let query= this.productRepo
      .createQueryBuilder('product')

      if(body.keyword !== ""){
        query = query.where(
        `unaccent(lower(product.name)) LIKE unaccent(lower(:keyword))`,
        { keyword: `%${body.keyword}%` },
      )
      }

      if(category !== 0 ){
        query = query.andWhere('product.idCategory = :category',{category})
      }
      if(subcate !== 0) {
        query = query.andWhere('product.subcategory = :subcate',{subcate})
      }
      if(body.bestselling !== 0) {
        query = query.orderBy('product.totalsold', 'DESC');      
      }
      if(body.rating !== 0) {
        query = query.orderBy('product.averageRating', 'DESC');
      }
      if(body.discount !==0) {
        query =query.orderBy('product.discount', 'DESC');
      }
      if(body.newdate !==0){
        query = query.orderBy('product.date','DESC')
      } 
      if (body.minprice !== 0 && body.maxprice === 0) {
        query = query.andWhere('product.discountPrice >= :min', { min: body.minprice });
      }
      if (body.maxprice !== 0 && body.minprice === 0) {
        query = query.andWhere('product.discountPrice <= :max', { max: body.maxprice });
      }
      
      try {
        const [products,total] = await query
      .skip(skip)
      .take(take)
      .getManyAndCount();

       return{
        success:true,
        data:products,
        message:'ok'
      }
      } catch (error) {
        return{
          success:false,
          message:error,
          data:null
        }
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

    // Cộng dồn rating
    pr.ratingSum = (pr.ratingSum || 0) + body.star;
    pr.ratingCount = (pr.ratingCount || 0) + 1;

    // Tính lại averageRating
    pr.averageRating = pr.ratingCount > 0 
      ? Number(pr.ratingSum) / Number(pr.ratingCount) 
      : 0;

    await this.productRepo.save(pr);

    return pr;
  } catch (error) {
    console.error("UpdateRating error:", error);
    throw error;
  }
}

async GetBestselling(page: number) {
  try {
    const [products, total] = await this.productRepo.findAndCount({
      order: { totalsold: 'DESC' }, // sắp xếp giảm dần theo totalsold
      skip: (page - 1) * 12,     // số lượng cần bỏ qua
      take: 12,                  // số lượng lấy
    });

    return {
      success: true,
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / 12),
    };
  } catch (error) {
    console.error("GetBestselling error:", error);
    return {
      success: false,
      message: "Không thể lấy danh sách bán chạy",
      error,
    };
  }
}

async Getratingprd(page:any){
  try {
    const [products,total] = await this.productRepo.findAndCount({
      order:{averageRating:'DESC'},
      skip: (page-1) * 12,
      take:12,
    })
        return {
      success: true,
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / 12),
    };
  } catch (error) {
     console.error("GetBestselling error:", error);
    return {
      success: false,
      message: "Không thể lấy danh sách bán chạy",
      error,
    };
  }
}


async Getnewprodct(page:any){
  try {
    const [products,total] = await this.productRepo.findAndCount({
      order:{createdAt:'DESC'},
      skip: (page-1) * 12,
      take:12,
    })
        return {
      success: true,
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / 12),
    };
  } catch (error) {
     console.error("GetBestselling error:", error);
    return {
      success: false,
      message: "Không thể lấy danh sách bán chạy",
      error,
    };
  }
}


async SearchPrdSeller(keyword:string,page:number,seller_id:number){
  try {
    const take = 10;
    const skip = (page - 1) * take;

    const [products, total] = await this.productRepo
      .createQueryBuilder('product')
      .where(
        `unaccent(lower(product.name)) LIKE unaccent(lower(:keyword))`,
        { keyword: `%${keyword}%` },
        
      )
      .andWhere(
        {idSeller:seller_id},
      )
      .orderBy('product.id', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

      // console.log(products);
      

    return {
      success:true,
      data: products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / take),
    };
  } catch (error) {
   return{
    success:false,
    data:null,
    message:'loi server'
   } 
  }
}


async Filterproduct(category: number, status: number, seller_id: number, quantity: number, page: number) {
  try {
    const take = 15; // số sản phẩm mỗi trang
    const skip = (page - 1) * take;

    let query = this.productRepo
      .createQueryBuilder("product")
      .where("product.idSeller = :seller_id", { seller_id })
      // .andWhere("product.idCategory = :category", { category });

    // Filter theo status
    if (status !== 0) {
      query = query.andWhere("product.status = :status", { status });
    }
    if(category !==0) {
      query = query.andWhere('product.idCategory = :category' ,{ category })
    }

    // Filter theo quantity
    if (quantity === 1) {
      query = query.andWhere("product.quantity < :minQuantity", { minQuantity: 20 });  
    } else if (quantity === 2) {
      query = query.andWhere("product.quantity > :maxQuantity", { maxQuantity: 50 });
    }

    // Lấy dữ liệu + count (phân trang)
    const [products, total] = await query
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      success: true,
      data: products,
      total,
      page,
      pageSize: take,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Lỗi khi filter sản phẩm",
    };
  }
}


async ProductDetailSeller(id: number, seller_id: number) {
  try {
    const product = await this.productRepo.findOne({
      where: { id, idSeller: seller_id },
      relations: [
        "subImages",          // lấy ảnh phụ
        "variants",           // lấy variants
        "variants.color",     // lấy màu từ variant
        "variants.size",      // lấy size từ variant
            // nếu muốn lấy luôn comments
      ],
    });

    if (!product) {
      return {
        success: false,
        message: "Không có sản phẩm nào",
        data: null,
      };
    }

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    return {
      success: false,
      message: "Có lỗi xảy ra khi lấy sản phẩm",
      data: null,
    };
  }
}

async AddFavourite(body:any){
    try {
      const add = this.favouriteRepo.create({
      user_id: body.user_id,
      product: { id: body.product_id },
    });
      const ok = await this.favouriteRepo.save(add)
      
      return {
        success:true,
        message:'ok',
        data:ok
      }
    } catch (error) {
      return{
        success:false,
        message:'loi service'
      }
    }
}


      async DeleteFv(body: any) {
        try {
          // Tìm favourite cần xóa
          const fv = await this.favouriteRepo.findOne({
            where: {
              user_id: body.user_id,
              product: { id: body.product_id },
            },
          });

          if (!fv) {
            return {
              success: false,
              message: 'Favourite không tồn tại',
            };
          }

          // Xóa
          await this.favouriteRepo.remove(fv);

          return {
            success: true,
            message: 'Đã xóa favourite',
            data: fv,
          };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            message: 'Lỗi service',
          };
        }
      }


async CheckFavourite(body:any){
  try {
    const exist = await this.favouriteRepo.findOne({
      where:{user_id:body.user_id,
        product:{id:body.product_id}

      }
      
    })

    return{
      success:true,
      data:!!exist,
      message:'ok'
    }
  } catch (error) {
    return {
      success:false,
      message:'loi service',
      data:null
    }
  }
}

async GetAllFavourite(user_id:number,page:number){
  const take = 12
  const skip = (page - 1) * take;
  try {
    const [prds] = await this.favouriteRepo.findAndCount(
      {where:{user_id},
      relations:['product'],
      skip,take

    
    }, 
    )

    if(!prds || prds.length ===0){
      return{
        success:false,
        data:null,
        message:'khon thấy sản phâm rnaof'
      }
    }
    return  {
      success:true,
      data:prds,
      message:'ok'
    }

  } catch (error) {
      return{
        success:false,
        message:'loi service',
        data:null

      }
  }
}

}
