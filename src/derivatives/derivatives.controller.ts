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

	// 주식선물(유가) 일별매매정보
	@Get("eqsfu_stk_bydd_trd")
	getEqsfuStkByddTrd() {
		return this.derivativesService.eqsfuStkByddTrd();
	}

	// 주식선물(코스닥) 일별매매정보
	@Get("eqkfu_ksq_bydd_trd")
	getEqkfuKsqByddTrd() {
		return this.derivativesService.eqkfuKsqByddTrd();
	}

	// 옵션 일별매매정보 (주식옵션外)
	@Get("opt_bydd_trd")
	getOptByddTrd() {
		return this.derivativesService.optByddTrd();
	}

	// 주식옵션(유가) 일별매매정보
	@Get("eqsop_bydd_trd")
	getEqsopByddTrd() {
		return this.derivativesService.eqsopByddTrd();
	}
}
