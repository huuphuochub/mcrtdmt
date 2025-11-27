import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  
  // CORS configuration - hỗ trợ cả localhost và Docker network
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://frontend:3000',
      'http://127.0.0.1:3000',
      'http://gateway:3000',
    ],
    credentials: true,
  });

  // Kết nối microservice RabbitMQ cho upload_image_queue
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://rabbitmq:5672'],
            urls: ['amqp://localhost:5672'],

      queue: 'upload_queue',
      queueOptions: { durable: false },
    },
  });

  // Kết nối microservice RabbitMQ cho upload_subimage_queue
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://rabbitmq:5672'],

                  urls: ['amqp://localhost:5672'],

      queue: 'subimg_queue',
      queueOptions: { durable: false },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://rabbitmq:5672'],
                  urls: ['amqp://localhost:5672'],

      queue: 'mailer_order',
      queueOptions: { durable: false },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://rabbitmq:5672'],
                  urls: ['amqp://localhost:5672'],

      queue: 'send_otp_email',
      queueOptions: { durable: false }, 
    },
  });

  await app.startAllMicroservices();
  
  // Sử dụng port từ environment variable hoặc mặc định 3000
  const port = process.env.PORT || 3003;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Cloundinary service started on port ${port}`);
} 
bootstrap(); 
