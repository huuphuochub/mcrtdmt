import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { SubimgModule } from './subimg/subimg.module';
import { Subimg } from './subimg/subimg.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'123456',
      database:'shopquanao',
      entities:[Product,Subimg],
      synchronize:true,

    }),
    
    
    ProductModule,
    
    
    SubimgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
