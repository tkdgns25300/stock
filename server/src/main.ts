import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);

	// API 및 버전 명시
	app.setGlobalPrefix("api/v1");

	// 서버 시작 log
	const port = 3000;

	await app.listen(port);
	logger.log(`Application listening on port ${port}`);
}
bootstrap();
