import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './noti.entity';
import { Seller } from 'src/seller/seller.entity';
import { User } from 'src/users/user.entity';
import { NotiController } from './noti.controller';
import { NotiService } from './noti.service';

@Module({
    imports:[(TypeOrmModule.forFeature([Notification,Seller,User]))],
    providers:[NotiService],
    controllers:[NotiController]
})

export class NotiModule {

}
 