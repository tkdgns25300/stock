import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class IndexService {
	async krxDdTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/idx/krx_dd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "KRX 시리즈 일별시세정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async kospiDdTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/idx/kospi_dd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "KOSPI 시리즈 일별시세정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async kosdaqDdTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/idx/kosdaq_dd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "KOSDAQ 시리즈 일별시세정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async bonDdTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/idx/bon_dd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "KOSDAQ 시리즈 일별시세정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async drvprodDdTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/idx/bon_dd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "KOSDAQ 시리즈 일별시세정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
