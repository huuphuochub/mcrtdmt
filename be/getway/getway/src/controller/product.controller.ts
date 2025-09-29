import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Inject,
  Body,
  UseGuards,
  Get,
  Param,
  Req,
  UnauthorizedException,
  Query
} from '@nestjs/common';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';
import { JwtSellerAuthGuardFromCookie } from 'src/auth/seller-jwt.guard';

import { ClientProxy } from '@nestjs/microservices';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { firstValueFrom } from 'rxjs';
import { GetSeller } from 'src/common/decorators/get-seller.decorator';
interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}
@Controller('product')
export class ProductController {
  constructor(
    @Inject('UPLOAD_SERVICE') private readonly uploadImgClient: ClientProxy,
    @Inject('SUBIMG_SERVICE') private readonly uploadSubImgClient: ClientProxy,
    private httpservice:HttpService,
  ) {}
   @UseGuards(JwtAuthGuardFromCookie)
  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 3 }
  ]))
  async uploadProductImages(@GetUser() user: any,
    @Body() body: any,
    @UploadedFiles() files: {
      mainImage?: Express.Multer.File[],
      subImages?: Express.Multer.File[]
    }
  ) {
    

          const seller = await this.httpservice.post('http://localhost:3004/seller/inforsellerbyuser',{user_id:user.id}).toPromise();
          

          if(!seller?.data.success){
            return{
              success:false,
              data:null,
              message:'khong co thong tin seller da dang ki'
            }
          }

    let subImgUrls: string[] = [];
    let mainImgUrl=''
    const mainImage = files.mainImage?.[0];
    const subImages = files.subImages ?? [];

    // gửi ảnh chính
    if (mainImage) {
    const  result = await this.uploadImgClient
        .send('upload_queue', {
           file: {
        buffer: mainImage.buffer,
        originalname: mainImage.originalname,
        mimetype: mainImage.mimetype,
      },
        })
        .toPromise();
        mainImgUrl = result.url
    }
    

    // gửi ảnh phụ
    if (subImages.length > 0) {
    const subimg =  await this.uploadSubImgClient
    .send('subimg_queue', {
      files: subImages.map(f => ({
        buffer: f.buffer,
        originalname: f.originalname,
        mimetype: f.mimetype,
      })),
    })
    .toPromise();
    
    subImgUrls = subimg.urls
}

  
  
    if(mainImgUrl && subImgUrls){
      
      const data = {
        name:body.name,
        image:mainImgUrl,
        idSeller:seller.data.data.id,
        describe:body.describe,
        price:body.price,
        idCategory:body.categoryId,
        date:new Date(),
        status:Number(body.visibility),
        discountprice:body.discountprice,
        quantity:body.quantity,
        ratingSum:0,
        ratingCount:0,
        averageRating:0,
        weigth:body.weigth,
        subcategory:body.subcategoryId
      }
      
      const product = await this.httpservice.post('http://localhost:3002/product/add',data).toPromise();

      const subimgdata = {
        id_product:product?.data.data.id,
        url :subImgUrls,
      }
      
      const subimg = await this.httpservice.post('http://localhost:3002/subimg/add',subimgdata).toPromise();

      
      
    }
    return {
      message: 'Upload thành công',
      mainImageUrl: mainImgUrl,
      subImageUrls: subImgUrls,
      body, // dữ liệu khác từ form như name, price,...
    };
  }


 @Get('getallproduct')
async getAllProduct(@Query('limit') limit:string, @Query('page') page:string) {
  const response = await this.httpservice
    .get('http://localhost:3002/product/getall',{
      params:{
        page,limit
      }
    })
    .toPromise();
  
  return response!.data; 
}
   @UseGuards(JwtSellerAuthGuardFromCookie)
 @Get('getallproductseller')
async getAllProductseller(@GetSeller() seller:any,  @Query('limit') limit:string, @Query('page') page:string) {
  
    if(!seller){
        return{
          success:false,
          data:null,
          message:'ban k phai sellse'
        }
    }
    
     const response = await this.httpservice
    .get('http://localhost:3002/product/getallbyseller',{
      params:{
        page,limit,seller_id:seller.seller_id
      }
    })
    .toPromise();
  
  return response!.data; 
  // } 
  
}

@Get('all/seller')
async getAllProductcuasellerchouser( @Query('limit') limit:string, @Query('page') page:string,@Query('seller_id') seller_id:string) {
      
     const response = await this.httpservice
    .get('http://localhost:3002/product/getallbyseller',{
      params:{
        page,limit,seller_id:seller_id
      }
    })
    .toPromise();
  
  return response!.data; 
  // } 
  
}


@Get('bestseller')
async getbeseller() {
  const response = await this.httpservice
    .get('http://localhost:3002/product/bestseller')
    .toPromise();
  
  return response!.data; // ✅ chỉ return phần data
}
@Get('productdetail/:id')
async getproductdatil(@Param('id') id:number){
  const response:any = await this.httpservice.get(`http://localhost:3002/product/productdetail/${id}`)
  .toPromise()
  
  if(!response.data.success){
    return {
      success:false,
      message:'khong ti thay san pham',
      data:null
    }
  }

  const product = response.data;

  const [imagesRes, categoryRes, subcategoryRes,countproductRes, sellerRes] =
  await Promise.allSettled([
    this.httpservice
      .get(`http://localhost:3002/subimg/subimgbyid/${id}`)
      .toPromise(),
    this.httpservice
      .get(`http://localhost:3002/category/getbyid/${response.data.data.idCategory}`)
      .toPromise(),
    this.httpservice
      .get(`http://localhost:3002/subcategory/getsubcategorybyid/${response.data.data.subcategory}`)
      .toPromise(),
    this.httpservice
      .get(`http://localhost:3002/product/countproductseller/${response.data.data.idSeller}`)
      .toPromise(),
    this.httpservice
      .get(`http://localhost:3004/seller/getseller/${response.data.data.idSeller}`)
      .toPromise(),
    
  ]);

  
  
 
return {
  success: true,
  data: {
    product:product,
    images:
      imagesRes.status === "fulfilled" ? imagesRes.value?.data ?? [] : [],
    category:
      categoryRes.status === "fulfilled" ? categoryRes.value?.data ?? null : null,
    subcategory:
      subcategoryRes.status === "fulfilled" ? subcategoryRes.value?.data ?? null : null,
    countlproduct:
      countproductRes.status === "fulfilled" ? countproductRes.value?.data ?? null : null,
    seller:
      sellerRes.status === "fulfilled" ? sellerRes.value?.data ?? null : null,
  },
};

}
// lay size theo id product
@Get('getsizebyproduct/:id')
async getSizebyidprd(@Param('id') id:number){
  const response = await this.httpservice
  .get(`http://localhost:3002/size/getsizebyidprd/${id}`)
  .toPromise();

  return response!.data;
}


    @Post('searchproductkeypage')
    async searchproduct(@Body() body:any){
      
      try {
            const response:any =   await this.httpservice.post('http://localhost:3002/product/searchkeypage',body).toPromise();
          
      return{
        success:true,
        data:response.data.data,
        message:false
      }
    } catch (error) {
      return{
        success:false,
        message:error,
        data:null,
      }
    } 
    }

       @UseGuards(JwtAuthGuardFromCookie)
    @Post('addserch')
    async addSearch(@Body() body:any, @Req() req:RequestWithCookies){
      const token = req.cookies?.access_token;

      if (!token) {
        return {
                    success:false,
                    message:'chua dang nhap',
                    data:null,
                    code:404
                }
      }

        try {
          const { data } = await firstValueFrom(
              this.httpservice.post(`http://localhost:3004/historysearch/add`, body, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              })
          );
          return data;
      } catch (error) {
          const errRes = error.response?.data || {};
          return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
    }


    @Post('getbestselling')
    async GetBestsell(@Body() body:any){

      try {
          const data:any =   await this.httpservice.post('http://localhost:3002/product/getbestselling',body).toPromise();

        return data.data
      } catch (error) {
          const errRes = error.response?.data || {};

         return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
    }

    @Post('getrating')
    async GetRating(@Body() body:any){
      
      try {
                  const data:any =   await this.httpservice.post('http://localhost:3002/product/getratingproduct',body).toPromise();

        return data.data
      } catch (error) {
          const errRes = error.response?.data || {};

         return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
    }


    
    @Post('getnewproduct')
    async GetNewProduct(@Body() body:any){
      
      try {
                  const data:any =   await this.httpservice.post('http://localhost:3002/product/getnewproduct',body).toPromise();

        return data.data
      } catch (error) {
          const errRes = error.response?.data || {};

         return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
    }

   @UseGuards(JwtSellerAuthGuardFromCookie)
    @Post('searchbyseller')
    async Searchprdbyseller(@GetSeller() seller:any,@Body() body:any){
      
      if(!seller){
        return{
          message:'loi roi ban oi',
          success:false,
          data:null
        }
      }
            
      try {
        const bddata = {
            seller_id:seller.seller_id,
            page:body.page,
            keyword:body.keyword,
        }
        const data:any =   await this.httpservice.post('http://localhost:3002/product/searchprdseller',bddata).toPromise();

        return data.data
      } catch (error) {
          const errRes = error.response?.data || {};

         return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
      
      
    }
   @UseGuards(JwtSellerAuthGuardFromCookie)
    @Post('filterproduct')
    async Filterproduct(@GetSeller() seller:any,@Body() body:any) {  
      if(!seller){
        return{
          message:'loi roi ban oi',
          success:false,
          data:null
        }
      }
      try {
        const bodydata = {
          category:body.body.category,
          status:body.body.status,
          seller_id:seller.seller_id,
          quantity:body.body.quantity,
          page:body.body.page
        }
          const data:any =   await this.httpservice.post('http://localhost:3002/product/filterproduct',bodydata).toPromise();
            
           return data.data

      } catch (error) {
        const errRes = error.response?.data || {};

         return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
      
    }





    @UseGuards(JwtSellerAuthGuardFromCookie)
    @Get('productdetailseller/:id')
    async GetDetailProductSeller(@Param('id') id:string,@GetSeller() seller:any){
        if(!seller){
          return{
            success:false,
            data:null,
            message:'vui long dang nhaptrang ban hang'
          }
        }

         try {
           const response:any = await this.httpservice
            .get(`http://localhost:3002/product/productdetailseller/${id}`,{
              params:{
                seller_id:seller.seller_id
              }
            })
            .toPromise();

            return response.data
         } catch (error) {
          return{
            success:false,
            data:null,
            message:'loi khi lay san pham'
          }
         }
    }

    @Get('sizeandcolor')
    async GetSizeColor(){
      try {
        
        const data:any = await this.httpservice.get('http://localhost:3002/size/sizeandcolor').toPromise()
        return data.data
      } catch (error) {
          return{
            success:false,
            data:null,
            message:'loi server'
          }
      }
    }

    @Post('filter/user')
    async FilterProductUser(
      // @Query('keyword') keyword:string,
      // @Query('page') page:string, 
      // @Query('category') category:string, 
      // @Query('subcate') subcate:string,
      // @Query('bestselling') bestselling:string,
      // @Query('rating') rating:string,
      // @Query('discount') discount:string,
      // @Query('newdate') newdate:string,
      // @Query('minprice') minprice:string,
      // @Query('maxprice') maxprice:string,

      @Body() body:any

      
      

    ){
      try {
        const data:any  = await this.httpservice.post('http://localhost:3002/product/filteruser', body).toPromise()
        return data.data

      } catch (error) {
         return{
            success:false,
            data:null,
            message:'loi server'
          }
      }
      
    }
   @UseGuards(JwtAuthGuardFromCookie)
    @Post('favourite/add')
    async AddFavourite(@Body() body:any,@GetUser() user:any){
      
      const databody = {
          user_id:user.id,
          product_id:body.product_id
      }
      try {
        const data:any = await this.httpservice.post('http://localhost:3002/product/addfavourite',databody).toPromise()
        return data.data
      } catch (error) {
        return{
          success:false,
          message:'loi gateway'
        }
      }
    }

       @UseGuards(JwtAuthGuardFromCookie)
    @Post('favourite/delete')
    async Delete(@Body() body:any,@GetUser() user:any){
      
      const databody = {
          user_id:user.id,
          product_id:body.product_id
      }
      try {
        const data:any = await this.httpservice.post('http://localhost:3002/product/delete',databody).toPromise()
        return data.data
      } catch (error) {
        return{
          success:false,
          message:'loi gateway'
        }
      }
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Post('favourite/check')
    async Checkfv(@Body() body:any,@GetUser() user:any){
      const databody = {
          user_id:user.id,
          product_id:body.product_id
      }
      try {
        const data:any = await this.httpservice.post('http://localhost:3002/product/checkfavourite',databody).toPromise()
        return data.data
      } catch (error) {
        return{
          success:false,
          message:'loi gateway'
        }
      }
    }


        @UseGuards(JwtAuthGuardFromCookie)
      @Get('all/favourite')
      async GetAllFavourite(@GetUser() user:any,@Query('page') page:string){
        try {
          const data:any = await this.httpservice.get('http://localhost:3002/product/all/favourite',{
            params:{user_id:user.id,page:page}
          }).toPromise();

          return data.data
        } catch (error) {
          return{
            success:false,
            message:'loi gateway',
            data:null,
          }
        }
      }

}
  