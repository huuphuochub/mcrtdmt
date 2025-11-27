import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './seller.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentSeller } from './commentseller.entity';
import { Notification } from 'src/noti/noti.entity';
import { Wallet } from 'src/wallet/wallet.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Seller,CommentSeller,Notification,Wallet]),
AuthModule
],
  controllers:[SellerController],
  providers: [SellerService]
})
export class SellerModule {}
