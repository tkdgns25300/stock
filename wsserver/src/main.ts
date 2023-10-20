<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  // WebSocket Versioning
  app.setGlobalPrefix('ws/v1');

  // CORS
  app.enableCors({
    origin: 'http://localhost:3000', // 허용할 Origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    allowedHeaders: 'Content-Type, Accept', // 허용할 헤더
    credentials: true, // 자격 증명 정보를 허용할지 여부
  });

  const port = 8001;
  await app.listen(port);
  logger.log(`WebSocket Server listening on port ${port}`);
=======
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);

	// WebSocket Versioning
	app.setGlobalPrefix("ws-server/v1");

	// CORS 설정
	app.enableCors({
		origin: "http://localhost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders: "Content-Type, Accept",
		credentials: true,
	});

	const port = 8001;
	await app.listen(port);
	logger.log(`WebSocket Server listening on port ${port}`);
>>>>>>> dev
}
bootstrap();

/**
 * call order
 * guard -> interceptor (before) -> pipe -> controller -> service -> controller -> interceptor (after) -> filter (if applicable) -> client
 */
