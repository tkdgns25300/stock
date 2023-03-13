import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // NODE_ENV 값에 따라 다른 .env 파일을 로드
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
