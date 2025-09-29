import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follow.entity';
import { Seller } from 'src/seller/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower,Seller])],
  controllers: [FollowerController],
  providers: [FollowerService]
})
export class FollowerModule {}
