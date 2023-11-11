import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service";

@Controller("health")
export class HealthController {
	constructor(private healthService: HealthService) {}

	// health check
	@Get()
	getHealth(): string {
		return "OK";
	}
}
