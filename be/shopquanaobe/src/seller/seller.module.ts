import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './seller.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentSeller } from './commentseller.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Seller,CommentSeller]),
AuthModule
],
  controllers:[SellerController],
  providers: [SellerService]
})
export class SellerModule {}
