import { Controller, Get } from "@nestjs/common";
import { StockService } from "./stock.service";

@Controller("stock")
export class StockController {
	constructor(private stockService: StockService) {}

	// 유가증권 일별매매정보
	@Get("stk_bydd_trd")
	getStkByddTrd() {
		return this.stockService.stkByddTrd();
	}
}
