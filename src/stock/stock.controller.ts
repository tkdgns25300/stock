import { Controller, Get } from "@nestjs/common";
import { StockService } from "./stock.service";

@Controller("stock")
export class StockController {
	constructor(private stockService: StockService) {}

	// 시가총액 Top 10 기업 조회
	@Get("top-market-cap")
	getTopMarketCap() {
		return this.stockService.getTopMarketCap();
	}
}
