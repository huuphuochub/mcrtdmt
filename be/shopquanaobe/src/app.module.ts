import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Seller } from './seller/seller.entity';
import { SellerController } from './seller/seller.controller';
// import { CategoryModule } from './category/category.module';
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart/cartItem.entity';
import { OrderItem } from './order/orderitem.entity';
import { Order } from './order/order.entity';
import { ConfigModule } from '@nestjs/config';
// import { CartController } from './cart/cart.controller';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      // host:process.env.DB_HOST,
      host:"localhost",
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities:[User,Seller,Cart,CartItem,Order,OrderItem],
      synchronize:true,
    }),
    UsersModule, 
     
    SellerModule, AuthModule, CartModule, OrderModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 