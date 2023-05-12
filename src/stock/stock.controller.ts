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

	// 코스닥 일별매매정보
	@Get("ksq_bydd_trd")
	getKsqByddTrd() {
		return this.stockService.ksqByddTrd();
	}

	// 코스넥 일별매매정보
	@Get("knx_bydd_trd")
	getKnxByddTrd() {
		return this.stockService.knxByddTrd();
	}

	// 신주인수권증권 일별매매정보
	@Get("sw_bydd_trd")
	getSwByddTrd() {
		return this.stockService.swByddTrd();
	}

	//신주인수권증서 일별매매정보
	@Get("sr_bydd_trd")
	getSrByddTrd() {
		return this.stockService.srByddTrd();
	}

	// 유가증권 종목기본정보
	@Get("stk_isu_base_info")
	getStkIsuBaseInfo() {
		return this.stockService.stkIsuBaseInfo();
	}

	// 코스닥 종목기본정보
	@Get("ksq_isu_base_info")
	getKsqIsuBaseInfo() {
		return this.stockService.ksqIsuBaseInfo();
	}

	// 코넥스 종목기본정보
	@Get("knx_isu_base_info")
	getKnxIsuBaseInfo() {
		return this.stockService.knxIsuBaseInfo();
	}
}
