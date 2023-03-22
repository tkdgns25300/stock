import { Controller, Get, Param } from "@nestjs/common";
import { UtilsService } from "./utils.service";

@Controller("utils")
export class UtilsController {
	constructor(private utilsService: UtilsService) {}

	// CSV to JSON
	@Get("/csvtojson/:market")
	async csvToJson(@Param("market") market: string): Promise<void> {
		return await this.utilsService.csvToJson(market);
	}
}
