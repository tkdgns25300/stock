import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { StockInfo } from "src/entities/StockInfo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { CompanySearchDto } from "src/dtos/CompanySearch.dto";
import { ChartDataQueryDto } from "src/dtos/StockPriceSearch.dto";
import { StockPriceByPeriodData } from "src/types/StockPriceByPeriodData";
import { getToken } from "src/util/token/token";
import { StockPriceInfoData } from "src/types/StockPriceInfoData";
import { BalanceSheet } from "src/entities/BalanceSheet.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";
import { FinancialInfoData } from "src/types/FinancialInfoData";
import Parser from "rss-parser";
import puppeteer from "puppeteer";
import { NewsData } from "src/types/NewsData";
import { InvestmentOpinionData } from "src/types/InvestmentOpinionData";

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(CompanyInfo)
		private companyInfoRepository: Repository<CompanyInfo>,
		@InjectRepository(StockInfo)
		private stockInfoRepository: Repository<StockInfo>,
		@InjectRepository(BalanceSheet)
		private balanceSheetRepository: Repository<BalanceSheet>,
		@InjectRepository(IncomeStatement)
		private incomeStatementRepository: Repository<IncomeStatement>,
		@InjectRepository(FinancialRatio)
		private financialRatioRepository: Repository<FinancialRatio>,
		@InjectRepository(ProfitRatio)
		private profitRatioRepository: Repository<ProfitRatio>,
	) {}

	async getStockList(): Promise<ApiResponse<StockInfo[]>> {
		try {
			const stockList = await this.stockInfoRepository
				.createQueryBuilder("stock_info")
				.innerJoin("stock_info.company_info", "company_info")
				.select([
					"company_info.name AS company_name",
					"stock_info.stock_code AS stock_code",
					"stock_info.stock_type AS stock_type",
				])
				.getRawMany();

			return new ApiResponse<StockInfo[]>(stockList, "Successfully fetched stock list");
		} catch (error) {
			throw new Error(`Failed to fetch stock list: ${error.message}`);
		}
	}

	private async findCompanyByName(name: string): Promise<CompanyInfo | null> {
		return await this.companyInfoRepository.findOne({
			where: { name },
		});
	}

	private async findCompanyByStockCode(stockCode: string): Promise<CompanyInfo | null> {
		const stockInfo = await this.stockInfoRepository.findOne({
			where: { stock_code: stockCode },
			relations: ["company_info"],
		});
		return stockInfo ? stockInfo.company_info : null;
	}

	async getCompanyInfoBySearch(companySearchDto: CompanySearchDto): Promise<ApiResponse<CompanyInfo>> {
		try {
			const { name, stockCode } = companySearchDto;
			let companyInfo: CompanyInfo | null = null;

			if (name) {
				companyInfo = await this.findCompanyByName(name);
			} else if (stockCode) {
				companyInfo = await this.findCompanyByStockCode(stockCode);
			}

			if (!companyInfo) {
				return new ApiResponse<CompanyInfo>(null, "Company not found", HttpStatus.NOT_FOUND);
			}

			return new ApiResponse<CompanyInfo>(companyInfo, "Successfully fetched company info");
		} catch (error) {
			throw new Error(`Failed to fetch company info: ${error.message}`);
		}
	}

	async getChartData(query: ChartDataQueryDto): Promise<ApiResponse<StockPriceByPeriodData[]>> {
		try {
			const token = await getToken();
			const headers = {
				"Content-Type": "application/json; charset=utf-8",
				appkey: process.env.KIS_APP_KEY,
				appsecret: process.env.KIS_APP_SECRET,
				tr_id: "FHKST03010100",
				custtype: "P",
				Authorization: `Bearer ${token}`,
			};
			const response = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?FID_COND_MRKT_DIV_CODE=${query.fidCondMrktDivCode}&FID_INPUT_ISCD=${query.fidInputIscd}&FID_INPUT_DATE_1=${query.fidInputDate1}&FID_INPUT_DATE_2=${query.fidInputDate2}&FID_PERIOD_DIV_CODE=${query.fidPeriodDivCode}&FID_ORG_ADJ_PRC=${query.fidOrgAdjPrc}`,
				{ headers },
			);
			const data = await response.json();
			const returnData: StockPriceByPeriodData[] = data.output2.map((item) => ({
				stckBsopDate: item.stck_bsop_date,
				stckClpr: item.stck_clpr,
				stckOprc: item.stck_oprc,
				stckHgpr: item.stck_hgpr,
				stckLwpr: item.stck_lwpr,
				acmlVol: item.acml_vol,
			}));

			return new ApiResponse<StockPriceByPeriodData[]>(returnData, "Successfully fetched chart data");
		} catch (error) {
			throw new HttpException(`Failed to fetch chart data: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getPriceInfo(stockCode: string): Promise<ApiResponse<StockPriceInfoData>> {
		try {
			const token = await getToken();
			const headers = {
				appkey: process.env.KIS_APP_KEY,
				appsecret: process.env.KIS_APP_SECRET,
				tr_id: "FHKST01010100",
				Authorization: `Bearer ${token}`,
			};
			const response = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${stockCode}`,
				{ headers },
			);
			const data = await response.json();

			const returnData: StockPriceInfoData = {
				stckPrpr: Number(data.output.stck_prpr),
				prdyVrss: Number(data.output.prdy_vrss),
				prdyVrssSign: Number(data.output.prdy_vrss_sign),
				stckHgpr: Number(data.output.stck_hgpr),
				stckLwpr: Number(data.output.stck_lwpr),
				w52Hgpr: Number(data.output.w52_hgpr),
				w52Lwpr: Number(data.output.w52_lwpr),
				htsAvls: Number(data.output.hts_avls),
			};

			return new ApiResponse<StockPriceInfoData>(returnData, "Successfully fetched the stock's price information");
		} catch (error) {
			throw new HttpException(`Failed to fetch current price: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getFinanceInfo(stockCode: string): Promise<ApiResponse<FinancialInfoData>> {
		try {
			const incomeStatement = await this.incomeStatementRepository.find({
				where: { stock_info: { stock_code: stockCode } },
			});
			const balanceSheet = await this.balanceSheetRepository.find({
				where: { stock_info: { stock_code: stockCode } },
			});
			const financialRatio = await this.financialRatioRepository.find({
				where: { stock_info: { stock_code: stockCode } },
			});
			const profitRatio = await this.profitRatioRepository.find({
				where: { stock_info: { stock_code: stockCode } },
			});

			const returnData: FinancialInfoData = {
				incomeStatement,
				balanceSheet,
				financialRatio,
				profitRatio,
			};

			return new ApiResponse<FinancialInfoData>(returnData, "Successfully fetched the stock's financial information");
		} catch (error) {
			throw new HttpException(`Failed to fetch current price: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getNews(companyName: string): Promise<ApiResponse<NewsData[]>> {
		try {
			const parser = new Parser();
			const encodedCompanyName = encodeURIComponent(companyName);
			const RSS_URL = `https://news.google.com/rss/search?q=${encodedCompanyName}&hl=ko&gl=KR&ceid=KR:ko`;
			const feed = await parser.parseURL(RSS_URL);

			const newsData: NewsData[] = feed.items.map((item) => ({
				title: item.title || "",
				link: item.link || "",
				pubDate: item.pubDate || "",
				content: item.content || "",
				contentSnippet: item.contentSnippet || "",
				guid: item.guid || "",
				isoDate: item.isoDate || "",
			}));

			return new ApiResponse(newsData, `Successfully fetched news for ${companyName}`);
		} catch (error) {
			throw new Error(`Failed to fetch news: ${error.message}`);
		}
	}

	async getInvestmentOpinion(stockCode: string): Promise<ApiResponse<InvestmentOpinionData[]>> {
		try {
			// 날짜를 'YYYYMMDD' 형식으로 변환하는 함수
			const formatDate = (date) => {
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, "0");
				const day = String(date.getDate()).padStart(2, "0");
				return `${year}${month}${day}`;
			};

			// 오늘의 날짜와 5년 전의 날짜를 계산
			const today = new Date();
			const fiveYearsAgo = new Date();
			fiveYearsAgo.setFullYear(today.getFullYear() - 5);

			const FID_INPUT_DATE_2 = formatDate(today);
			const FID_INPUT_DATE_1 = formatDate(fiveYearsAgo);

			const token = await getToken();
			const headers = {
				"Content-Type": "application/json; charset=utf-8",
				appkey: process.env.KIS_APP_KEY,
				appsecret: process.env.KIS_APP_SECRET,
				tr_id: "FHKST663400C0",
				custtype: "P",
				Authorization: `Bearer ${token}`,
			};

			const response = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/invest-opbysec?FID_COND_MRKT_DIV_CODE=J&FID_COND_SCR_DIV_CODE=16634&FID_INPUT_ISCD=${stockCode}&FID_DIV_CLS_CODE=0&FID_INPUT_DATE_1=${FID_INPUT_DATE_1}&FID_INPUT_DATE_2=${FID_INPUT_DATE_2}`,
				{ headers },
			);

			const data = await response.json();
			const returnData: InvestmentOpinionData[] = data.output.map((investOpinion) => {
				return {
					stckBsopDate: investOpinion.stck_bsop_date,
					invtOpnn: investOpinion.invt_opnn,
					invtOpnnClsCode: investOpinion.invt_opnn_cls_code,
					mbcrName: investOpinion.mbcr_name,
					htsGoalPrc: investOpinion.hts_goal_prc,
				};
			});

			return new ApiResponse<InvestmentOpinionData>(returnData, "Successfully fetched the stock's price information");
		} catch (error) {
			throw new HttpException(`Failed to fetch current price: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
