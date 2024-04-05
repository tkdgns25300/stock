import { Test, TestingModule } from "@nestjs/testing";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

describe("HealthController", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HealthController],
			providers: [
				{
					provide: HealthService,
					useValue: {}, // Mock 객체
				},
			],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it("/health (GET)", () => {
		return request(app.getHttpServer()).get("/health").expect(200).expect("OK");
	});

	afterAll(async () => {
		await app.close();
	});
});
