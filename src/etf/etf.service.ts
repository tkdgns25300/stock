import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";

@Injectable()
export class EtfService {
	async etfByddTrd() {
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
