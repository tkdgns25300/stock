import { Controller, Get } from "@nestjs/common";
import { IndexService } from "./index.service";

@Controller("index")
export class IndexController {
	constructor(private indexService: IndexService) {}

	// 유가증권 일별매매정보
	@Get("krx_dd_trd")
	getKrxDdTrd() {
		return this.indexService.krxDdTrd();
	}
}
