<<<<<<< HEAD
import { Controller, Get, Param } from "@nestjs/common";
import { UtilsService } from "./utils.service";
=======
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
>>>>>>> dev

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
<<<<<<< HEAD
=======

	// Finacial Info to DB
	@Post("/financial-info-to-database")
	async financialInfoToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.financialInfoToDatabase();
	}

	// Financial Info : Balance Sheet Info to DB
	@Post("/balance-sheet-to-database")
	async balanceSheetToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.balanceSheetToDatabase();
	}

	@Post("/retry-failed-balance-sheet-to-database")
	async retryFailedBalanceSheetToDatabase(@Body() failedStocks: string[]): Promise<ApiResponse<{}>> {
		return await this.utilsService.retryFailedBalanceSheetToDatabase(failedStocks);
	}

	// Financial Info : Income Statement Info to DB
	@Post("/income-statement-to-database")
	async incomeStatementToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.incomeStatementToDatabase();
	}

	@Post("/retry-failed-income-statement-to-database")
	async retryFailedIncomeStatementToDatabase(@Body() failedStocks: string[]): Promise<ApiResponse<string[]>> {
		return await this.utilsService.retryFailedIncomeStatementToDatabase(failedStocks);
	}

	// Financial Info : Financial Ratio Info to DB
	@Post("/financial-ratio-to-database")
	async financialRatioToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.financialRatioToDatabase();
	}

	@Post("/retry-failed-financial-ratio-to-database")
	async retryFailedFinancialRatioToDatabase(@Body() failedStocks: string[]): Promise<ApiResponse<string[]>> {
		return await this.utilsService.retryFailedFinancialRatioToDatabase(failedStocks);
	}

	// Financial Info : Profit Ratio Info to DB
	@Post("/profit-ratio-to-database")
	async profitRatioToDatabase(): Promise<ApiResponse<{}>> {
		return await this.utilsService.profitRatioToDatabase();
	}

	@Post("/retry-failed-profit-ratio-to-database")
	async retryFailedProfitRatioToDatabase(@Body() failedStocks: string[]): Promise<ApiResponse<string[]>> {
		return await this.utilsService.retryFailedProfitRatioToDatabase(failedStocks);
	}
>>>>>>> dev
}
