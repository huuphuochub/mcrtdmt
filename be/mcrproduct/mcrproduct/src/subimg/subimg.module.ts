import { Module } from '@nestjs/common';
import { SubimgController } from './subimg.controller';
import { SubimgService } from './subimg.service';
import { Subimg } from './subimg.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subimg])],
  controllers: [SubimgController],
  providers: [SubimgService]
})
export class SubimgModule {}
