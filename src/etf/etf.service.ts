import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class EtfService {
	async etfByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/etp/etf_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "ETF 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async etnByddTrd() {
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
