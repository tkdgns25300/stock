import { Controller, Get } from "@nestjs/common";
import { EtfService } from "./etf.service";

@Controller("etf")
export class EtfController {
	constructor(private etfService: EtfService) {}

	// ETF 일별매매정보
	@Get("etf_bydd_trd")
	getEtfByddTrd() {
		return this.etfService.etfByddTrd();
	}

	// ETN 일별매매정보
	@Get("etn_bydd_trd")
	getEtnByddTrd() {
		return this.etfService.etnByddTrd();
	}
}
