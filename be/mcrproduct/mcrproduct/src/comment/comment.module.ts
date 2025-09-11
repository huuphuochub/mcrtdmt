import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { Product } from 'src/product/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Product,Comment])],

  providers: [CommentService],
  controllers:[CommentController]
})
export class CommentModule {}
