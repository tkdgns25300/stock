import { Controller, Get, Param } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { ApiResponse } from "src/dtos/ApiResponse.dto";

@Controller("utils")
export class UtilsController {
	constructor(private utilsService: UtilsService) {}

	// CSV to JSON : First Step
	@Get("/csv-to-json-first/:market/:date")
	async csvToJsonFirst(@Param("market") market: string, @Param("date") date: string): Promise<string> {
		return await this.utilsService.csvToJsonFirst(market, date);
	}

	// CSV to JSON : Second Step
	@Get("/csv-to-json-second/:market/:date")
	async csvToJsonSecond(@Param("market") market: string, @Param("date") date: string): Promise<string> {
		return await this.utilsService.csvToJsonSecond(market, date);
	}

	// CSV to JSON : Second Step
	@Get("/csv-to-json-third/:market/:date")
	async csvToJsonThird(@Param("market") market: string, @Param("date") date: string): Promise<string> {
		return await this.utilsService.csvToJsonThird(market, date);
	}

	// JSON to DB : Final Step
	@Get("/json-to-database/:market/:date")
	async jsonToDatabase(@Param("market") market: string, @Param("date") date: string): Promise<string> {
		return await this.utilsService.jsonToDatabase(market, date);
	}

	// Finacial Info to DB
	@Get("/financial-info-to-database")
	async financialInfoToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.financialInfoToDatabase();
	}

	// Financial Info : Balance Sheet Info to DB
	@Get("/balance-sheet-to-database")
	async balanceSheetToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.balanceSheetToDatabase();
	}

	// Financial Info : Income Statement Info to DB
	@Get("/income-statement-to-database")
	async incomeStatementToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.incomeStatementToDatabase();
	}
}
