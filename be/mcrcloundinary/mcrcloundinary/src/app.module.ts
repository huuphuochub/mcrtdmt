import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadService } from './cloundinary/cloundinay.upload';
import { UploadController } from './controller/upload.controller';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './service/mailerservice';
import { MailerController } from './controller/mailercontroller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
    MailerModule.forRoot({
      transport:{
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.userMailer,
          pass: process.env.passMailer,
        },
      },


    }),
],
  controllers: [AppController, UploadController,MailerController],
  providers: [AppService, UploadService,MailService],
})
export class AppModule {}
