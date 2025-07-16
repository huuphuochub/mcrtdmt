import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Inject,
  Body
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('UPLOAD_SERVICE') private readonly uploadImgClient: ClientProxy,
    @Inject('SUBIMG_SERVICE') private readonly uploadSubImgClient: ClientProxy,
  ) {}

  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 3 }
  ]))
  async uploadProductImages(
    @Body() body: any,
    @UploadedFiles() files: {
      mainImage?: Express.Multer.File[],
      subImages?: Express.Multer.File[]
    }
  ) {
    console.log('FILES:', body);

    let mainImgUrl = '';
    let subImgUrls: string[] = [];

    const mainImage = files.mainImage?.[0];
    const subImages = files.subImages ?? [];

    // Gửi ảnh chính
    if (mainImage) {
      mainImgUrl = await this.uploadImgClient
        .send('upload_queue', {
          buffer: mainImage.buffer,
          originalname: mainImage.originalname,
          mimetype: mainImage.mimetype,
        })
        .toPromise();
    }

    // Gửi ảnh phụ
    if (subImages.length > 0) {
      subImgUrls = await this.uploadSubImgClient
        .send('subimg_queue', subImages.map(f => ({
          buffer: f.buffer,
          originalname: f.originalname,
          mimetype: f.mimetype,
        })))
        .toPromise();
    }

    // TODO: Gọi sang product service (qua HTTP hoặc message) để lưu sản phẩm
    if(mainImage && subImgUrls){
      console.log("anh chinh" + mainImgUrl);
      console.log("anhh phu" + subImgUrls);
      
      
    }
    return {
      message: 'Upload thành công',
      mainImageUrl: mainImgUrl,
      subImageUrls: subImgUrls,
      body, // dữ liệu khác từ form như name, price,...
    };
  }
}
