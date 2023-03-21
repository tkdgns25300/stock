import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class StockService {
	async stkByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/sample/apis/sto/stk_bydd_trd.json";
			const response = await axios.get(url, {
				headers: {
					"User-Agent": "axios",
					Authorization: `Bearer ${process.env.API_KEY}`, // API 키를 사용하여 인증합니다.
				},
			});

			return new PageResObj(response, "유가증권 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
