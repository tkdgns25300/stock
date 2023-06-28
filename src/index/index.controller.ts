import { Controller, Get } from "@nestjs/common";
import { IndexService } from "./index.service";

@Controller("index")
export class IndexController {
	constructor(private indexService: IndexService) {}

	// KRX 시리즈 일별시세정보
	@Get("krx_dd_trd")
	getKrxDdTrd() {
		return this.indexService.krxDdTrd();
	}

	// KOSPI 시리즈 일별시세정보
	@Get("kospi_dd_trd")
	getKospiDdTrd() {
		return this.indexService.kospiDdTrd();
	}

	// KOSDAQ 시리즈 일별시세정보
	@Get("kosdaq_dd_trd")
	getKosdaqDdTrd() {
		return this.indexService.kosdaqDdTrd();
	}

	// 채권지수 시세정보
	@Get("bon_dd_trd")
	getBonDdTrd() {
		return this.indexService.bonDdTrd();
	}

	// 파생상품지수 시세정보
	@Get("drvprod_dd_trd")
	getDrvprodDdTrd() {
		return this.indexService.drvprodDdTrd();
	}
}
