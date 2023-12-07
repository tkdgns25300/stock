import { Controller, Get } from "@nestjs/common";
import { EsgService } from "./esg.service";

@Controller("esg")
export class EsgController {
	constructor(private esgService: EsgService) {}

	// 사회책임투자채권 정보
	@Get("sri_bond_info")
	getSriBondInfo() {
		return this.esgService.sriBondInfo();
	}
}
