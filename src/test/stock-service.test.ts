import { Test, TestingModule } from "@nestjs/testing";
import { StockService } from "src/stock/stock.service";

describe("StockService", () => {
	let service: StockService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [StockService],
		}).compile();

		service = module.get<StockService>(StockService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// 추가적인 테스트 케이스 작성
});
