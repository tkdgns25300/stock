import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";

@Injectable()
export class StockService {
	getTop10() {
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
