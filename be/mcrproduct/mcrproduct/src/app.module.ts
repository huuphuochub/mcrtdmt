import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { SubimgModule } from './subimg/subimg.module';
import { Subimg } from './subimg/subimg.entity';

import { SizeModule } from './size/size.module';
import { Color } from './size/color.entity';
import { Size } from './size/size.entity';
import { ProductVariants } from './size/product_variants.entity';

import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { Subcategory } from './category/subcategory.entity';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';
import { Favourite } from './product/favouriteproduct.entity';
import { ConfigModule } from '@nestjs/config'; 
@Module({  
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true, // ✅ để tất cả module đều dùng được
      envFilePath: '.env', // ✅ chỉ đường dẫn tới file .env
    }),
    TypeOrmModule.forRoot({  
      type:'postgres', 
      host:process.env.DB_HOST, 
      // host:"localhost", 
      
      port: Number(process.env.DB_PORT),
      username:process.env.DB_USERNAME, 
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME, 
      entities:[Product,Subimg,Color,Size,ProductVariants,Category,Subcategory,Comment,Favourite],
      synchronize:true,
      ssl: { rejectUnauthorized: false }

    }),
    
    
    ProductModule, 
    
     
    SubimgModule,
    
    
    SizeModule,
    
    
    CategoryModule,
    
    
    CommentModule,
    
    
    ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
