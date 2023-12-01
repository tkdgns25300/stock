import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class GeneralProductService {
	async oilByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/gen/oil_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "석유시장 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async goldByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/gen/gold_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "금시장 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async etsByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/gen/ets_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "배출권 시장 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
