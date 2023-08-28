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

	// 일반채권시장 일별매매정보
	@Get("bnd_bydd_trd")
	getBndByddTrd() {
		return this.bondService.bndByddTrd();
	}

	// 소액채권시장 일별매매정보
	@Get("smb_bydd_trd")
	getSmbByddTrd() {
		return this.bondService.smbByddTrd();
	}
}
