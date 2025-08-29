import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './http-exception.filter';
import { ConfigModule } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());
  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true,
  })
  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();
