import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Seller } from './seller/seller.entity';
import { Category } from './category/category.entity';
import { SellerController } from './seller/seller.controller';
// import { CategoryModule } from './category/category.module';
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { Subcategory } from './category/subcategory.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'123456',
      database:'shopquanao',
      entities:[User,Seller,Category,Subcategory],
      synchronize:true,
    }),
    UsersModule,
     
    SellerModule, AuthModule, CategoryModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
