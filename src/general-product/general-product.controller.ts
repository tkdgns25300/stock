import { Controller, Get } from "@nestjs/common";
import { GeneralProductService } from "./general-product.service";

@Controller("general-product")
export class GeneralProductController {
	constructor(private generalProductService: GeneralProductService) {}

	// 석유시장 일별매매정보
	@Get("oil_bydd_trd")
	getFutByddTrd() {
		return this.generalProductService.futByddTrd();
	}
}
