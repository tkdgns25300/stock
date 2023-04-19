import { Controller, Get, Param } from "@nestjs/common";
import { UtilsService } from "./utils.service";

@Controller("utils")
export class UtilsController {
	constructor(private utilsService: UtilsService) {}

	// CSV to JSON
	// @Get("/csvtojson/:market")
	// async csvToJson(@Param("market") market: string): Promise<void> {
	// 	return await this.utilsService.csvToJson(market);
	// }

	// Scraping And Save Company Description
	@Get("/scraping-description/:market")
	async scrapingCompanyDescription(@Param("market") market: string): Promise<string> {
		return await this.utilsService.scrapingCompanyDescription(market);
	}

	// CSV to JSON : First Step
	@Get("/csv-to-json-first/:market/:date")
	async csvToJsonFirst(@Param("market") market: string, @Param("date") date: string): Promise<string> {
		return await this.utilsService.csvToJsonFirst(market, date);
	}

	// CSV to JSON : Second Step
	@Get("/csv-to-json-second/:market/:date")
	async csvToJsonSecond(@Param("market") market: string, @Param("date") date: string) {
		return await this.utilsService.csvToJsonSecond(market, date);
	}
}
