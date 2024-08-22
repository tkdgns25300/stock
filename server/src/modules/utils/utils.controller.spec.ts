import { Test, TestingModule } from "@nestjs/testing";
import { UtilsController } from "./utils.controller";
import { UtilsService } from "./utils.service";
import { ApiResponse } from "src/dtos/ApiResponse.dto";

describe("UtilsController", () => {
	let utilsController: UtilsController;
	let utilsService: UtilsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UtilsController],
			providers: [
				{
					provide: UtilsService,
					useValue: {
						csvToJsonFirst: jest.fn(),
						csvToJsonSecond: jest.fn(),
						csvToJsonThird: jest.fn(),
						jsonToDatabase: jest.fn(),
						financialInfoToDatabase: jest.fn(),
						balanceSheetToDatabase: jest.fn(),
						retryFailedBalanceSheetToDatabase: jest.fn(),
						incomeStatementToDatabase: jest.fn(),
						retryFailedIncomeStatementToDatabase: jest.fn(),
						financialRatioToDatabase: jest.fn(),
						retryFailedFinancialRatioToDatabase: jest.fn(),
						profitRatioToDatabase: jest.fn(),
						retryFailedProfitRatioToDatabase: jest.fn(),
						databaseUpdate: jest.fn(),
					},
				},
			],
		}).compile();

		utilsController = module.get<UtilsController>(UtilsController);
		utilsService = module.get<UtilsService>(UtilsService);
	});
});
