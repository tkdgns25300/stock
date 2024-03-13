import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../app.module";

describe("BondController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("/cats (GET)", () => {
		return request(app.getHttpServer()).get("/cats").expect(200).expect("This action returns all cats");
	});

	// 추가적인 테스트 케이스 작성
});
