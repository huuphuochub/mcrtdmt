import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadService } from './cloundinary/cloundinay.upload';
import { UploadController } from './upload.controller';


@Module({
  // imports: [CloundinaryModule],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
  imports: [],
})
export class AppModule {}
