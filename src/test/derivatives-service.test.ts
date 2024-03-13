import { Test, TestingModule } from "@nestjs/testing";
import { DerivativesService } from "src/derivatives/derivatives.service";

describe("DerivativesService", () => {
	let service: DerivativesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DerivativesService],
		}).compile();

		service = module.get<DerivativesService>(DerivativesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// 추가적인 테스트 케이스 작성
});
