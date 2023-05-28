import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { StockInfo } from "src/entities/StockInfo.entity";
import { CompanySearchDto } from "src/dtos/CompanySearch.dto";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";

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
	async getChartData(): Promise<ApiResponse<any>> {
		return await this.companyService.getChartData();
	}
}
