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

	it("should be defined", () => {
		expect(utilsController).toBeDefined();
	});

	it("should call csvToJsonFirst method with correct parameters", async () => {
		const market = "NASDAQ";
		const date = "2024-08-25";
		const result = "CSV to JSON First Step";
		jest.spyOn(utilsService, "csvToJsonFirst").mockResolvedValue(result);

		expect(await utilsController.csvToJsonFirst(market, date)).toBe(result);
		expect(utilsService.csvToJsonFirst).toHaveBeenCalledWith(market, date);
	});

	it("should call csvToJsonSecond method with correct parameters", async () => {
		const market = "NASDAQ";
		const date = "2024-08-25";
		const result = "CSV to JSON Second Step";
		jest.spyOn(utilsService, "csvToJsonSecond").mockResolvedValue(result);

		expect(await utilsController.csvToJsonSecond(market, date)).toBe(result);
		expect(utilsService.csvToJsonSecond).toHaveBeenCalledWith(market, date);
	});

	it("should call csvToJsonThird method with correct parameters", async () => {
		const market = "NASDAQ";
		const date = "2024-08-25";
		const result = "CSV to JSON Third Step";
		jest.spyOn(utilsService, "csvToJsonThird").mockResolvedValue(result);

		expect(await utilsController.csvToJsonThird(market, date)).toBe(result);
		expect(utilsService.csvToJsonThird).toHaveBeenCalledWith(market, date);
	});

	it("should call jsonToDatabase method with correct parameters", async () => {
		const market = "NASDAQ";
		const date = "2024-08-25";
		const result = "JSON to DB";
		jest.spyOn(utilsService, "jsonToDatabase").mockResolvedValue(result);

		expect(await utilsController.jsonToDatabase(market, date)).toBe(result);
		expect(utilsService.jsonToDatabase).toHaveBeenCalledWith(market, date);
	});
});
