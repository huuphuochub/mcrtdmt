// src/image-processor/dto/process-product-images.dto.ts
// (Hoặc đặt trong thư mục dto/ của service nào nhận DTO này, ví dụ: product/dto/create-product-with-images.dto.ts nếu đây là DTO frontend gửi lên)

import {
  IsArray,
  IsUrl,
  IsNotEmpty,
  IsNumber,
  IsInt, // Thêm IsInt nếu bạn chắc chắn đó là số nguyên
  Min, // Thêm Min nếu id_product không được nhỏ hơn một giá trị nhất định (ví dụ: 1)
} from 'class-validator';
import { Type } from 'class-transformer'; // Cần cho @Type(() => Number)

export class CreateSubimgtDto {
  @IsNumber({}, { message: 'id_product must be a number' })
  @IsInt({ message: 'id_product must be an integer' }) // Nếu bạn chắc chắn id_product là số nguyên
  @Min(1, { message: 'id_product must be a positive number' }) // Ví dụ: id_product phải >= 1
  @IsNotEmpty({ message: 'id_product should not be empty' })
  @Type(() => Number) // Quan trọng: Đảm bảo NestJS/class-transformer chuyển đổi từ string (từ request body) sang number
  id_product: number; // Kiểu dữ liệu là number

  @IsArray({ message: 'urls must be an array' })
  @IsUrl({}, { each: true, message: 'Each item in urls must be a valid URL' }) // Áp dụng kiểm tra URL cho từng phần tử trong mảng
  @IsNotEmpty({ each: true, message: 'Each URL string in urls should not be empty' }) // Đảm bảo URL không phải chuỗi rỗng
  url: string[]; // Kiểu dữ liệu là mảng các chuỗi URL
}