import { Controller, Get } from "@nestjs/common";
import { UtilsService } from "./utils.service";

@Controller("utils")
export class UtilsController {
	constructor(private utilsService: UtilsService) {}

	// CSV to JSON
	@Get("/csvtojson")
	async csvToJson(): Promise<void> {
		return await this.utilsService.csvToJson();
	}
}
