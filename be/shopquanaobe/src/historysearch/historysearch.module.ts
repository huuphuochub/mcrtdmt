import { Module } from '@nestjs/common';
import { HistorysearchService } from './historysearch.service';
import { HistorySearch } from './historysearch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorysearchController } from './historysearch.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module(
  {

    imports:[TypeOrmModule.forFeature([HistorySearch]),
  AuthModule
  ],
  providers: [HistorysearchService],
  controllers:[HistorysearchController]
})
export class HistorysearchModule {}
