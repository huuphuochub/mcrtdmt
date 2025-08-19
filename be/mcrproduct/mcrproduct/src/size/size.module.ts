import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { Color } from './color.entity';
import { Size } from './size.entity';
import { ProductVariants } from './product_variants.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Color,Size,ProductVariants])],
    providers:[SizeService],
    controllers:[SizeController],
      exports: [SizeService],


})
export class SizeModule {}
