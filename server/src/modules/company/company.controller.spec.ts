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
						getCompanyInfoBySearch: jest.fn().mockResolvedValue({
							success: true,
							data: {
								id: 1,
								name: "AJ네트웍스",
								detailed_name: "AJ네트웍스보통주",
								english_name: "AJ Networks Co.,Ltd.",
								description:
									"동사가 영위하는 사업은 렌탈 사업부문, 창고 및 유통부문, 그리고 기타부문으로 구분됨. 렌탈 사업부문에서 취급하는 상품은 파렛트, IT기기, 건설산업장비 등이 있음. IT솔루션기기는 사무실에서 사용하는 OA기기 뿐 아니라, 로봇 등 모바일기기에 이르기까지 다양한 품목을 취급 중임. 연결종속회사인 베트남 현지법인 2개사를 통하여 베트남에서 냉장ㆍ냉동 창고임대업을 영위하고 있음.",
								industry_name: "산업용 기계 및 장비 임대업",
								industry_code: "147603",
								capital: 46822295000,
								currency: "원(KRW)",
								fiscal_month: 12,
								ceo: "손삼달",
								main_phone: "02-6363-9999",
								address: "서울특별시 송파구 정의로8길 9 (문정동, AJ빌딩)",
								website: "http://www.ajnetworks.co.kr",
								founded_date: new Date("2000-02-10T00:00:00.000Z"),
							} as CompanyInfo,
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
