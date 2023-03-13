import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Logger } from "@nestjs/common";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	private readonly logger = new Logger(LoggingMiddleware.name);

	use(req: Request, res: Response, next: NextFunction) {
		if (process.env.NODE_ENV === "development") {
			const { method, originalUrl } = req;
			this.logger.log(`${method} ${originalUrl} has been executed`);
		}
		next();
	}
}
