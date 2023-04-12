import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// API 및 버전 명시
	app.setGlobalPrefix("api/v1");

	await app.listen(3000);
}
bootstrap();
