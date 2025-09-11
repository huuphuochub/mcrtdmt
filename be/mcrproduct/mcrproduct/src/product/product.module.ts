import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import {Size} from '../size/size.entity'
import {Color} from '../size/color.entity';
import { Comment } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Color,Size,Comment])],
  
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
