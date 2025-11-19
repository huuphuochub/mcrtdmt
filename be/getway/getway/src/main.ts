import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());


   process.on('unhandledRejection', (reason, promise) => {
    console.error('--- UNHANDLED REJECTION IN GETWAY SERVICE ---');
    console.error('Reason:', reason);
    console.error('Promise:', promise);
    // Tùy chọn: Dừng ứng dụng sau khi ghi log lỗi nghiêm trọng
    // process.exit(1); 
  });

  // 2. GHI LOG CHO CÁC LỖI ĐỒNG BỘ (SYNCHRONOUS ERROR)
  process.on('uncaughtException', (err) => {
    console.error('--- UNCAUGHT EXCEPTION IN GETWAY SERVICE ---');
    console.error('Error:', err);
    // Tùy chọn: Dừng ứng dụng sau khi ghi log lỗi nghiêm trọng
    // process.exit(1); 
  });




  app.use(cookieParser());
  
  // CORS configuration - hỗ trợ cả localhost và Docker network
  const allowedOrigins = [
    'http://localhost:3000',
    'http://frontend:3000',
    'http://127.0.0.1:3000',
  ];
  
  app.enableCors({
    origin: (origin, callback) => {
      // Cho phép requests không có origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Tạm thời cho phép tất cả để debug
      }
    },
    credentials: true,
  });
   
//     app.connectMicroservice<MicroserviceOptions>({
//   transport: Transport.RMQ,
//   options: {
//         // urls: ['amqp://localhost:5672'],
// // 
//     urls: ['amqp://rabbitmq:5672'],
//     queue: 'gateway_queue',
//     queueOptions: { durable: false },
//   },
// });

// await app.startAllMicroservices(); 
// await app.init()
  
  // Sử dụng port từ environment variable hoặc mặc định 3000
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`✅ Gateway started on port ${port}`);
}
bootstrap();
