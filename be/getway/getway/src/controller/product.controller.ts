import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Inject,
  Body,
  UseGuards,
  Get,
  Param
} from '@nestjs/common';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';

import { ClientProxy } from '@nestjs/microservices';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/common/decorators/get-user.decorator';

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
//     console.log("user" , user);
    
//     console.log('FILES:', body);
// console.log('MAIN IMAGE:', files.mainImage);
// console.log('SUB IMAGES:', files.subImages);
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
    // console.log(subimg);
    
    subImgUrls = subimg.urls
}

  // console.log(mainImgUrl);
  // console.log(subImgUrls);
  
  
    if(mainImgUrl && subImgUrls){
      // console.log("da luu vao database");
      
      const data = {
        name:body.name,
        image:mainImgUrl,
        idSeller:user.id,
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
        subcategory:body.subcategoryId
      }
      // console.log(data);
      
      const product = await this.httpservice.post('http://localhost:3002/product/add',data).toPromise();
      // console.log(product?.data.data.id);

      const subimgdata = {
        id_product:product?.data.data.id,
        url :subImgUrls,
      }
      // console.log(subimgdata);
      
      const subimg = await this.httpservice.post('http://localhost:3002/subimg/add',subimgdata).toPromise();

      // console.log(subimg);
      
      
      
    }
    return {
      message: 'Upload thành công',
      mainImageUrl: mainImgUrl,
      subImageUrls: subImgUrls,
      body, // dữ liệu khác từ form như name, price,...
    };
  }


 @Get('getallproduct')
async getAllProduct() {
  const response = await this.httpservice
    .get('http://localhost:3002/product/getall')
    .toPromise();
  // console.log(response);
  
  return response!.data; // ✅ chỉ return phần data
}

@Get('bestseller')
async getbeseller() {
  const response = await this.httpservice
    .get('http://localhost:3002/product/bestseller')
    .toPromise();
  // console.log(response);
  
  return response!.data; // ✅ chỉ return phần data
}
@Get('productdetail/:id')
async getproductdatil(@Param('id') id:number){
  const response = await this.httpservice.get(`http://localhost:3002/product/productdetail/${id}`)
  .toPromise()
  if(!response){
    return {
      success:false,
      message:'khong ti thay san pham',
      data:null
    }
  }
  // console.log(response.data);

  const product = response.data;

// if (!product?.idCategory || !product?.subcategory || !product?.idSeller) {
//   return {
//     success: false,
//     message: 'Thiếu thông tin sản phẩm để load chi tiết',
//     data: product,
//   };
// }

  const [imagesRes, categoryRes, subcategoryRes, userRes, sellerRes] =
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
      .get(`http://localhost:3004/users/getuser/${response.data.data.idSeller}`)
      .toPromise(),
    this.httpservice
      .get(`http://localhost:3004/seller/getseller/${response.data.data.idSeller}`)
      .toPromise(),
    
    // this.httpservice
    //   .get(`http://product:3002/subimg/subimgbyid/${id}`)
    //   .toPromise(),
    // this.httpservice
    //   .get(`http://user:3004/category/getbyid/${response.data.data.idCategory}`)
    //   .toPromise(),
    // this.httpservice
    //   .get(`http://user:3004/subcategory/getsubcategorybyid/${response.data.data.subcategory}`)
    //   .toPromise(),
    // this.httpservice
    //   .get(`http://user:3004/users/getuser/${response.data.data.idSeller}`)
    //   .toPromise(),
    // this.httpservice
    //   .get(`http://user:3004/seller/getseller/${response.data.data.idSeller}`)
    //   .toPromise(),


  ]);
  // console.log(images,category,subcategory,user,seller);
  
 
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
    user:
      userRes.status === "fulfilled" ? userRes.value?.data ?? null : null,
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

}
  