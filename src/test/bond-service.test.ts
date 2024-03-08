import { Test, TestingModule } from "@nestjs/testing";
import { BondService } from "src/bond/bond.service";

describe("BondService", () => {
	let service: BondService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BondService],
		}).compile();

		service = module.get<BondService>(BondService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// 추가적인 테스트 케이스 작성
});
