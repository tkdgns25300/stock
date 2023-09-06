import { Controller, Get } from "@nestjs/common";
import { DerivativesService } from "./derivatives.service";

@Controller("derivatives")
export class DerivativesController {
	constructor(private derivativesService: DerivativesService) {}

	// 선물 일별매매정보 (주식선물外)
	@Get("fut_bydd_trd")
	getFutByddTrd() {
		return this.derivativesService.futByddTrd();
	}
}
