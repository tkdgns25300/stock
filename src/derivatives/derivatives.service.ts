import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class DerivativesService {
	async futByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/drv/fut_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "선물 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async eqsfuStkByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/drv/eqsfu_stk_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "주식선물(유가) 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async eqkfuKsqByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/drv/eqkfu_ksq_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "주식선물(코스닥) 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async optByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/drv/opt_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "옵션 일별매매정보 (주식옵션外) 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async eqsopByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/drv/eqsop_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "주식옵션(유가) 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async eqkopByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/drv/eqkop_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "주식옵션(코스닥) 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
