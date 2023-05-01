import { Controller, Get, Param } from "@nestjs/common";
import { CompanyService } from "./company.service";

@Controller("company")
export class CompanyController {
	constructor(private companyService: CompanyService) {}
}
