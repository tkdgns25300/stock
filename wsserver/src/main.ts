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
}
bootstrap();

/**
 * call order
 * guard -> interceptor (before) -> pipe -> controller -> service -> controller -> interceptor (after) -> filter (if applicable) -> client
 */
