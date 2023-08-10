import { Controller, Get } from "@nestjs/common";
import { BondService } from "./bond.service";

@Controller("bond")
export class BondController {
	constructor(private bondService: BondService) {}

	// 국채전문유통시장 일별매매정보
	@Get("kts_bydd_trd")
	getKtsByddTrd() {
		return this.bondService.ktsByddTrd();
	}
}
