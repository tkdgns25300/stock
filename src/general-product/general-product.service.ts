import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class GeneralProductService {
	async futByddTrd() {
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
