import { Controller, Get } from "@nestjs/common";
import { GeneralProductService } from "./general-product.service";

@Controller("general-product")
export class GeneralProductController {
	constructor(private generalProductService: GeneralProductService) {}

	// 석유시장 일별매매정보
	@Get("oil_bydd_trd")
	getOilByddTrd() {
		return this.generalProductService.oilByddTrd();
	}

	// 금시장 일별매매정보
	@Get("gold_bydd_trd")
	getGoldByddTrd() {
		return this.generalProductService.goldByddTrd();
	}

	// 배출권 시장 일별매매정보
	@Get("ets_bydd_trd")
	getEtsByddTrd() {
		return this.generalProductService.etsByddTrd();
	}
}
