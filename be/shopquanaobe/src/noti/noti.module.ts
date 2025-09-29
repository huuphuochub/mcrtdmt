import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './noti.entity';
import { Seller } from 'src/seller/seller.entity';
import { User } from 'src/users/user.entity';

@Module({
    imports:[(TypeOrmModule.forFeature([Notification,Seller,User]))]
})

export class NotiModule {

}
 