import { Test, TestingModule } from "@nestjs/testing";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { StockInfo } from "src/entities/StockInfo.entity";
import { CompanySearchDto } from "src/dtos/CompanySearch.dto";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { ChartDataQueryDto } from "src/dtos/StockPriceSearch.dto";
import { StockPriceInfoData } from "src/types/StockPriceInfoData";
import { StockPriceByPeriodData } from "src/types/StockPriceByPeriodData";
import { FinancialInfoData } from "src/types/FinancialInfoData";
import { InvestmentOpinionData } from "src/types/InvestmentOpinionData";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { BalanceSheet } from "src/entities/BalanceSheet.entity";

describe("CompanyController", () => {
	let app: INestApplication;
	let companyService: CompanyService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CompanyController],
			providers: [
				{
					provide: CompanyService,
					useValue: {
						getStockList: jest.fn().mockResolvedValue({
							success: true,
							data: [
								{
									standard_code: "HK0000057197",
									stock_code: "900110",
									listing_date: new Date("2010-04-23T00:00:00.000Z"),
									face_value: "무액면",
									listed_shares: 431932050,
									market_type: "KOSDAQ",
									stock_type: "보통주",
									affiliation: "외국기업(소속부없음)",
									security_type: "외국주권",
									company_info: {
										id: 2020,
									},
								} as StockInfo,
								{
									standard_code: "HK0000214814",
									stock_code: "900270",
									listing_date: new Date("2016-08-18T00:00:00.000Z"),
									face_value: "무액면",
									listed_shares: 125535084,
									market_type: "KOSDAQ",
									stock_type: "보통주",
									affiliation: "외국기업(소속부없음)",
									security_type: "외국주권",
									company_info: {
										id: 2526,
									},
								} as StockInfo,
							],
						}),
					},
				},
			],
		}).compile();

		app = module.createNestApplication();
		await app.init();
		companyService = module.get<CompanyService>(CompanyService);
	});

	afterAll(async () => {
		await app.close();
	});
});
