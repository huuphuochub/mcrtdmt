import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './http-exception.filter';


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
  
  // Sử dụng port từ environment variable hoặc mặc định 3000
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`✅ Product service started on port ${port}`);
}
bootstrap();
   