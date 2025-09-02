import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadService } from './cloundinary/cloundinay.upload';
import { UploadController } from './controller/upload.controller';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './service/mailerservice';
import { MailerController } from './controller/mailercontroller';



@Module({
  imports: [
    MailerModule.forRoot({
      transport:{
        host: 'smtp.example.com',
        port: 587,
        auth: {
          user: process.env.userMailer,
          pass: process.env.passMailer,
        },
      }
    }),
    ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController, UploadController,MailerController],
  providers: [AppService, UploadService,MailService],
})
export class AppModule {}
