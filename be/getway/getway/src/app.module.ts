import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ProductController } from './controller/product.controller';
import { UserController } from './controller/usercontroller';
import { HttpModule } from '@nestjs/axios';
import { Categorycontroller } from './controller/category.controller';
import { Subcategorycontroller } from './controller/subcategory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
   imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'upload_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'SUBIMG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'subimg_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    HttpModule
  ],
  controllers: [ProductController,UserController,Categorycontroller,Subcategorycontroller],
})
export class AppModule {}
