import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './seller.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[TypeOrmModule.forFeature([Seller]),
AuthModule
],
  controllers:[SellerController],
  providers: [SellerService]
})
export class SellerModule {}
