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
						getChartData: jest.fn().mockResolvedValue({
							success: true,
							data: [
								{
									stckBsopDate: "2024-01-01",
									stckClpr: 150,
									stckOprc: 148,
									stckHgpr: 155,
									stckLwpr: 145,
									acmlVol: 10000,
								} as StockPriceByPeriodData,
								{
									stckBsopDate: "2024-01-02",
									stckClpr: 155,
									stckOprc: 152,
									stckHgpr: 160,
									stckLwpr: 150,
									acmlVol: 12000,
								} as StockPriceByPeriodData,
							],
						}),
						getPriceInfo: jest.fn().mockResolvedValue({
							success: true,
							data: {
								stckPrpr: 150, // 현재 주가
								prdyVrss: 5, // 전일 대비 주가 변동
								prdyVrssSign: 1, // 전일 대비 주가 상승 (1: 상승, -1: 하락)
								stckHgpr: 155, // 현재 고가
								stckLwpr: 145, // 현재 저가
								w52Hgpr: 180, // 52주 최고가
								w52Lwpr: 130, // 52주 최저가
								htsAvls: 10000, // HTS에서의 거래 가능 수량
							} as StockPriceInfoData,
						}),
						getFinanceInfo: jest.fn().mockResolvedValue({
							success: true,
							data: {
								balanceSheet: [
									{
										id: 1,
										stac_yymm: new Date("2024-03-01T00:00:00Z"),
										cras: 2477,
										fxas: 583,
										total_aset: 3060,
										flow_lblt: 95,
										fix_lblt: 84,
										total_lblt: 179,
										cpfn: 1562,
										total_cptl: 2882,
										stock_info: {
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
										},
									} as BalanceSheet,
								],
								incomeStatement: [
									{
										id: 1,
										stac_yymm: new Date("2024-03-01T00:00:00Z"),
										sale_account: 122,
										sale_cost: 82,
										sale_totl_prfi: 40,
										bsop_prti: 1,
										op_prfi: 6,
										spec_prfi: 100,
										spec_loss: 100,
										thtr_ntin: 3,
										stock_info: {
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
										},
									} as IncomeStatement,
								],
								financialRatio: [
									{
										id: 1,
										stac_yymm: new Date("2024-03-01T00:00:00Z"),
										grs: 38,
										bsop_prfi_inrt: 128,
										ntin_inrt: 19,
										roe_val: 0,
										eps: 1,
										sps: 113,
										bps: 666,
										rsrv_rate: 84,
										lblt_rate: 6,
										stock_info: {
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
										},
									} as FinancialRatio,
								],
								profitRatio: [
									{
										id: 1,
										stac_yymm: new Date("2024-03-01T00:00:00Z"),
										cptl_ntin_rate: 0,
										self_cptl_ntin_inrt: 0,
										sale_ntin_rate: 2,
										sale_totl_rate: 33,
										stock_info: {
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
										},
									} as ProfitRatio,
								],
							} as FinancialInfoData,
						}),
						getNews: jest.fn().mockResolvedValue({
							success: true,
							data: [{ title: "Apple News", content: "Some content" }],
						}),
						getInvestmentOpinion: jest.fn().mockResolvedValue({
							success: true,
							data: [
								{
									stckBsopDate: "2024-01-01", // 주어진 형식에 맞는 날짜 문자열
									invtOpnn: "Buy", // 투자 의견
									stckPrpr: "Strong growth potential", // 주가 전망
									mbcrName: "John Doe", // 분석가 이름
									htsGoalPrc: "150", // 목표 주가
								} as InvestmentOpinionData,
								{
									stckBsopDate: "2024-01-02",
									invtOpnn: "Hold",
									stckPrpr: "Steady performance",
									mbcrName: "Jane Smith",
									htsGoalPrc: "155",
								} as InvestmentOpinionData,
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

	it("/company/stock-list (GET)", async () => {
		const response = await request(app.getHttpServer()).get("/company/stock-list").expect(200);

		expect(response.body).toEqual({
			success: true,
			data: [
				{
					standard_code: "HK0000057197",
					stock_code: "900110",
					listing_date: "2010-04-23T00:00:00.000Z", // 문자열로 변경
					face_value: "무액면",
					listed_shares: 431932050,
					market_type: "KOSDAQ",
					stock_type: "보통주",
					affiliation: "외국기업(소속부없음)",
					security_type: "외국주권",
					company_info: {
						id: 2020,
					},
				},
				{
					standard_code: "HK0000214814",
					stock_code: "900270",
					listing_date: "2016-08-18T00:00:00.000Z",
					face_value: "무액면",
					listed_shares: 125535084,
					market_type: "KOSDAQ",
					stock_type: "보통주",
					affiliation: "외국기업(소속부없음)",
					security_type: "외국주권",
					company_info: {
						id: 2526,
					},
				},
			],
		});
	});

	it("/company/search (GET)", async () => {
		const query: CompanySearchDto = { name: "Apple" };
		const response = await request(app.getHttpServer()).get("/company/search").query(query).expect(200);

		expect(response.body).toEqual({
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
				founded_date: "2000-02-10T00:00:00.000Z",
			},
		});
	});

	it("/company/chart-data (GET)", async () => {
		const query: ChartDataQueryDto = {
			fidCondMrktDivCode: "KOSDAQ", // 시장 구분 코드 예시
			fidInputIscd: "AAPL", // 입력 종목 코드
			fidInputDate1: "2024-01-01", // 시작 날짜 (형식: YYYY-MM-DD)
			fidInputDate2: "2024-01-31", // 종료 날짜 (형식: YYYY-MM-DD)
			fidPeriodDivCode: "1d", // 기간 구분 코드 (예: 1일)
			fidOrgAdjPrc: "Y", // 가격 조정 여부 (예: Y 또는 N)
		};
		const response = await request(app.getHttpServer()).get("/company/chart-data").query(query).expect(200);

		expect(response.body).toEqual({
			success: true,
			data: [
				{
					stckBsopDate: "2024-01-01",
					stckClpr: 150,
					stckOprc: 148,
					stckHgpr: 155,
					stckLwpr: 145,
					acmlVol: 10000,
				} as StockPriceByPeriodData,
				{
					stckBsopDate: "2024-01-02",
					stckClpr: 155,
					stckOprc: 152,
					stckHgpr: 160,
					stckLwpr: 150,
					acmlVol: 12000,
				} as StockPriceByPeriodData,
			],
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
