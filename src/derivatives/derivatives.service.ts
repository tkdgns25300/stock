import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class DerivativesService {
	async futByddTrd() {
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
