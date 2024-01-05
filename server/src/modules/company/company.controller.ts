import { Controller, Get, Inject, Param, Query, UsePipes, ValidationPipe } from "@nestjs/common";
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
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller("company")
export class CompanyController {
	constructor(
		private companyService: CompanyService, //  @Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

	// Cache Test
	// @Get("/cache")
	// async getCache(): Promise<ApiResponse<string>> {
	// 	const savedTime = await this.cacheManager.get<number>("time");
	// 	if (savedTime) {
	// 		return new ApiResponse<string>("saved time : " + savedTime, "Successfully get cache data");
	// 	}
	// 	const now = new Date().getTime();
	// 	await this.cacheManager.set("time", now);
	// 	return new ApiResponse<string>("save new time : " + now, "Successfully set cache data");
	// }

	// get all stock code & Stock's company name
	@Get("/stock-list")
	async getStockList(): Promise<ApiResponse<StockInfo[]>> {
		return await this.companyService.getStockList();
	}

	// get company info by stock code or company name
	@Get("/search")
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async getCompanyInfo(@Query() companySearchDto: CompanySearchDto): Promise<ApiResponse<CompanyInfo>> {
		return await this.companyService.getCompanyInfoBySearch(companySearchDto);
	}

	// get company chart by stock code
	@Get("/chart-data")
	async getChartData(@Query() query: ChartDataQueryDto): Promise<ApiResponse<StockPriceByPeriodData[]>> {
		return await this.companyService.getChartData(query);
	}

	// get company current price by stock code
	@Get("/price-info/:stockCode")
	async getCurrentPrice(@Param("stockCode") stockCode: string): Promise<ApiResponse<StockPriceInfoData>> {
		return await this.companyService.getPriceInfo(stockCode);
	}

	// get company finance info by stock code
	@Get("/finance-info/:stockCode")
	async getFinanceInfo(@Param("stockCode") stockCode: string): Promise<ApiResponse<FinancialInfoData>> {
		return await this.companyService.getFinanceInfo(stockCode);
	}

	// get company news by company name
	@Get("/news/:companyName")
	async getNews(@Param("companyName") companyName: string) {
		return await this.companyService.getNews(companyName);
	}

	// get company invest opinion by stock code
	@Get("/investOpinion/:stockCode")
	async getInvestOpinion(@Param("stockCode") stockCode: string): Promise<ApiResponse<InvestmentOpinionData[]>> {
		return await this.companyService.getInvestmentOpinion(stockCode);
	}
}
