import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ProductController } from './controller/product.controller';
import { sellerController, UserController } from './controller/usercontroller';
import { HttpModule } from '@nestjs/axios';
import { Categorycontroller } from './controller/category.controller';
import { Subcategorycontroller } from './controller/subcategory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { Cartcontroller } from './controller/cart.controller';
import { OrderController } from './controller/order.controller';
import { ViettelpostService } from './service/viettelpost.service';
import { ConfigModule } from '@nestjs/config';
import { CommentProductController } from './controller/commentproduct.controller';
import { ChatGateway } from './service/socketio/socketio';
// import { ChatService } from './service/chat.service';
import { Chatcontroller } from './controller/chat.controller';
import { FolowerController } from './controller/folower.controller';
import { Notification } from './controller/notification.controller';
import { GeminiController } from './controller/chatboxai.controller';
import * as dotenv from 'dotenv';
import { GeminiService } from './service/geminiai';
dotenv.config();


@Module({
   imports: [
     ConfigModule.forRoot({
      isGlobal: true, // để toàn app dùng được
    }),
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
             urls: ['amqp://rabbitmq:5672'],

          queue: 'upload_queue',
          queueOptions: { durable: false },
        },
      },
       {
        name: 'SEND_MAIL_ORDER',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
             urls: ['amqp://rabbitmq:5672'],

          queue: 'mailer_order',
          queueOptions: { durable: false }, 
        },
      },

       {
        name: 'SEND_OTP_EMAIL',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
             urls: ['amqp://rabbitmq:5672'],

          queue: 'send_otp_email',
          queueOptions: { durable: false }, 
        },
      },
      {
        name: 'SUBIMG_SERVICE',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
           urls: ['amqp://rabbitmq:5672'],

          queue: 'subimg_queue',
          queueOptions: { durable: false },
        },
      },

       {
        name: 'IMG_SENDMESS',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
           urls: ['amqp://rabbitmq:5672'],

          queue: 'img_sendmess',
          queueOptions: { durable: false },
        },
      },
    ]),
    HttpModule,AuthModule
  ],
    providers: [ViettelpostService,ChatGateway,GeminiService],
      exports: [ViettelpostService], // nếu muốn dùng ở chỗ khác


  controllers: [ProductController,UserController,Notification,Categorycontroller,Subcategorycontroller,GeminiController,Cartcontroller,sellerController,OrderController ,CommentProductController,Chatcontroller,FolowerController]
})
export class AppModule {}
