import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './orderitem.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Notification } from 'src/noti/noti.entity';

@Module({

    imports: [TypeOrmModule.forFeature([Order, OrderItem,Notification]),
AuthModule
],
   controllers: [OrderController],
   providers: [OrderService],
})
export class OrderModule {}
