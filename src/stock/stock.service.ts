import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class StockService {
	async stkByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json", // 응답 데이터 형식을 text로 설정
				headers: {
					AUTH_KEY: process.env.API_KEY, // API 키를 AUTH_KEY 필드에 추가하여 전달합니다.
				},
			});

			return new PageResObj(response.data, "유가증권 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
//
