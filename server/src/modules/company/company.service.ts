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
import axios from "axios";
import cheerio from "cheerio";
import { NewsData } from "src/types/NewsData";
import { link } from "fs";

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

	// async getNews(companyName: string): Promise<ApiResponse<NewsData[]>> {
	// 	try {
	// 		const browser = await puppeteer.launch();
	// 		const page = await browser.newPage();
	// 		const encodedCompanyName = encodeURIComponent(companyName);
	// 		const searchURL = `https://news.google.com/search?q=${encodedCompanyName}&hl=ko&gl=KR&ceid=KR:ko`;

	// 		await page.goto(searchURL, { waitUntil: "networkidle2" });

	// 		const articles = await page.evaluate(() => {
	// 			const articleNodes = Array.from(document.querySelectorAll("article"));
	// 			return articleNodes.slice(0, 30).map((article) => {
	// 				const titleElement = article.querySelector("h3") || article.querySelector("h4");
	// 				const linkElement = article.querySelector("a");
	// 				const snippetElement = article.querySelector(".HO8did");
	// 				const dateElement = article.querySelector("time");

	// 				return {
	// 					title: titleElement?.textContent || "",
	// 					link: linkElement?.href || "",
	// 					contentSnippet: snippetElement?.textContent || "",
	// 					pubDate: dateElement?.getAttribute("datetime") || "",
	// 					guid: linkElement?.href || "",
	// 					isoDate: dateElement?.getAttribute("datetime") || "",
	// 					content: "", // Assuming content is not directly available
	// 				};
	// 			});
	// 		});

	// 		await browser.close();

	// 		const newsData: NewsData[] = await Promise.all(articles.map(async (article) => article));

	// 		return new ApiResponse(newsData, `Successfully fetched news for ${companyName}`);
	// 	} catch (error) {
	// 		throw new HttpException(`Failed to fetch news: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
	// 	}
	// }

	async getNews(companyName: string): Promise<ApiResponse<NewsData[]>> {
		try {
			// Puppeteer 브라우저 실행
			const browser = await puppeteer.launch();
			const page = await browser.newPage();

			// 검색어를 인코딩하여 URL 생성
			const encodedCompanyName = encodeURIComponent(companyName);
			const searchURL = `https://news.google.com/search?q=${encodedCompanyName}&hl=ko&gl=KR&ceid=KR:ko`;

			// 페이지 이동 및 로드 대기
			await page.goto(searchURL, { waitUntil: "networkidle2" });

			// 기사 추출
			const articles = await page.evaluate(() => {
				// 페이지에서 모든 기사(article) 요소 선택
				const articleNodes = Array.from(document.querySelectorAll("article"));
				console.log(articleNodes.length);

				// 기사 요소를 순회하며 필요한 데이터 추출
				return articleNodes.slice(0, 30).map((article: HTMLElement) => {
					// 기사 제목과 링크 추출
					const titleElement = article.querySelector("h3 a") || article.querySelector("h4 a");
					const linkElement = article.querySelector("h3 a") || article.querySelector("h4 a");
					const title = titleElement?.textContent?.trim() || "";
					const link = linkElement?.getAttribute("href") || "";

					// 기사 발행일 추출
					const dateElement = article.querySelector("time");
					const pubDate = dateElement?.getAttribute("datetime") || "";

					// 기사 내용 요약 추출
					const snippetElement = article.querySelector(".HO8did");
					const contentSnippet = snippetElement?.textContent?.trim() || "";

					// GUID 설정 (기사 링크로 대체)
					const guid = link;

					// ISO 날짜 추출
					const isoDate = pubDate;

					// 기사 데이터 객체 반환
					return {
						title,
						link,
						pubDate,
						contentSnippet,
						guid,
						isoDate,
						content: "", // 기사 내용은 직접적으로 추출하지 않음
					};
				});
			});

			// Puppeteer 브라우저 종료
			await browser.close();

			// 추출한 기사 데이터 반환
			return new ApiResponse(articles, `${companyName}에 대한 뉴스 가져오기 성공`);
		} catch (error) {
			// 에러 발생 시 예외 처리
			throw new HttpException(`뉴스 가져오기 실패: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
// article :
// #yDmH0d > c-wiz:nth-child(29) > div > main > div.UW0SDc > c-wiz > c-wiz:nth-child(1) > c-wiz > article

// title :
// #yDmH0d > c-wiz:nth-child(29) > div > main > div.UW0SDc > c-wiz > c-wiz:nth-child(1) > c-wiz > article > div.m5k28 > div.B6pJDd > div > a

// link :
// #yDmH0d > c-wiz:nth-child(29) > div > main > div.UW0SDc > c-wiz > c-wiz:nth-child(1) > c-wiz > article > div.m5k28 > div.B6pJDd > div > a

// news logo :
// #yDmH0d > c-wiz:nth-child(29) > div > main > div.UW0SDc > c-wiz > c-wiz:nth-child(1) > c-wiz > article > div.m5k28 > div.B6pJDd > div > div > img.msvBD.zC7z7b

// time :
// #yDmH0d > c-wiz:nth-child(29) > div > main > div.UW0SDc > c-wiz > c-wiz:nth-child(1) > c-wiz > article > div.UOVeFe > time

// image :
// #yDmH0d > c-wiz:nth-child(29) > div > main > div.UW0SDc > c-wiz > c-wiz:nth-child(1) > c-wiz > article > div.m5k28 > figure > img
