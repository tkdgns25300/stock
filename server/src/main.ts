import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { ApiResponseInterceptor } from "./interceptors/apiResponse.intercepters";

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);

	// API Versioning
	app.setGlobalPrefix("api-server/v1");

	// CORS
	app.enableCors({
		origin: [
			"http://localhost:3000",
			"https://d1dpk80jpvij81.cloudfront.net",
			"https://stockpedia.online",
			"https://www.stockpedia.online",
			"*",
		], // 허용할 Origin
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용할 HTTP 메서드
		allowedHeaders: "Content-Type, Accept", // 허용할 헤더
		credentials: true, // 자격 증명 정보를 허용할지 여부
	});

	// Interceptors
	app.useGlobalInterceptors(new ApiResponseInterceptor());

	const port = 80;
	await app.listen(port);
	logger.log(`API Server listening on port ${port}`);
}
bootstrap();

/**
 * call order
 * guard -> interceptor (before) -> pipe -> controller -> service -> controller -> interceptor (after) -> filter (if applicable) -> client
 */
