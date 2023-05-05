import { Controller, Get, Param } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { ApiResponse } from "src/dtos/apiResponse.dto";

@Controller("company")
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	// get all stock code & Stock's company name
	@Get("/stock-list")
	async getStockList(): Promise<any> {
		return await this.companyService.getStockList();
	}
}
