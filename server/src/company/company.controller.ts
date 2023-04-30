import { Controller, Get, Param } from "@nestjs/common";
import { CompanyService } from "./company.service";

@Controller("company")
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	// 기업 Description 조회
	@Get("/description/:stockCode")
	async getCompanyDescription(@Param("stockCode") stockCode: string): Promise<string> {
		return await this.companyService.getCompanyDescription(stockCode);
	}
}
