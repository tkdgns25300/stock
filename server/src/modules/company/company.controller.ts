import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { StockInfo } from "src/entities/StockInfo.entity";
import { CompanySearchDto } from "src/dtos/CompanySearch.dto";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { ChartDataQueryDto } from "src/dtos/StockPriceSearch.dto";
<<<<<<< HEAD
=======
import { StockPriceInfoData } from "src/types/StockPriceInfoData";
import { StockPriceByPeriodData } from "src/types/StockPriceByPeriodData";
import { FinancialInfoData } from "src/types/FinancialInfoData";
import { InvestmentOpinionData } from "src/types/InvestmentOpinionData";
>>>>>>> dev

@Controller("company")
export class CompanyController {
	constructor(private companyService: CompanyService) {}

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
<<<<<<< HEAD
	async getChartData(@Query() query: ChartDataQueryDto): Promise<ApiResponse<any>> {
=======
	async getChartData(@Query() query: ChartDataQueryDto): Promise<ApiResponse<StockPriceByPeriodData[]>> {
>>>>>>> dev
		return await this.companyService.getChartData(query);
	}

	// get company current price by stock code
<<<<<<< HEAD
	@Get("/current-price/:stockCode")
	async getCurrentPrice(@Param("stockCode") stockCode: string): Promise<ApiResponse<any>> {
		return await this.companyService.getCurrentPrice(stockCode);
=======
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
>>>>>>> dev
	}
}
