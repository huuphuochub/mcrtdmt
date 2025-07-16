import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategorycontroller } from './category.controller';
import { Subcategory } from './subcategory.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Category,Subcategory])],
  providers: [CategoryService],
  controllers: [CategoryController,Subcategorycontroller]
})
export class CategoryModule {}
