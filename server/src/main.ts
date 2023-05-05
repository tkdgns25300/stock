import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { ApiResponseInterceptor } from "./interceptors/apiResponse.intercepters";

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);

	// API Versioning
	app.setGlobalPrefix("api/v1");

	// Interceptors
	app.useGlobalInterceptors(new ApiResponseInterceptor());

	const port = 3000;
	await app.listen(port);
	logger.log(`Application listening on port ${port}`);
}
bootstrap();

/**
 * call order
 * guard -> interceptor (before) -> pipe -> controller -> service -> controller -> interceptor (after) -> filter (if applicable) -> client
 */
