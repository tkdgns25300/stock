import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class StockService {
	async stkByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "유가증권 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async ksqByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/ksq_bydd_trd?basDd=20230414";
			const response = await axios.get(url, {
				responseType: "json", // json 형식으로 반환
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "코스닥 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async knxByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/knx_bydd_trd?basDd=20230414";
			const response = await axios.get(url, {
				responseType: "json", // json 형식으로 반환
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "코스텍 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async swByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/sw_bydd_trd?basDd=20230414";
			const response = await axios.get(url, {
				responseType: "json", // json 형식으로 반환
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "신주인수권증권 일별매매정보 조회에 성공하였습니다.");
			// reference : http://openapi.krx.co.kr/contents/OPP/USES/service/OPPUSES002_S2.cmd?BO_ID=erXKnEAzTqcGnkcoSdGA
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async srByddTrd() {
		const url = "http://data-dbg.krx.co.kr/svc/apis/sto/sr_bydd_trd?basDd=20230414";
		const response = await axios.get(url, {
			responseType: "json", // json 형식으로 반환
			headers: {
				AUTH_KEY: process.env.API_KEY,
			},
		});

		return new PageResObj(response.data, "신주인수권증서 일별매매정보 조회에 성공하였습니다.");
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async stkIsuBaseInfo() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_isu_base_info?basDd=20230414";
			const response = await axios.get(url, {
				responseType: "json", // json 형식으로 반환
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "유가증권 종목기본정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async ksqIsuBaseInfo() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/ksq_isu_base_info?basDd=20230414";
			const response = await axios.get(url, {
				responseType: "json", // json 형식으로 반환
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "코스닥 종목기본정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async knxIsuBaseInfo() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/knx_isu_base_info?basDd=20230414";
			const response = await axios.get(url, {
				responseType: "json", // json 형식으로 반환
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "코스넥 종목기본정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
