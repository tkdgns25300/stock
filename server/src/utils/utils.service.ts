import path from "path";
import { Injectable } from "@nestjs/common";
import { convertCsvToJson } from "src/util/csvToJson";

@Injectable()
export class UtilsService {
	async csvToJson(market: string): Promise<void> {
		// CSV 파일 경로 설정
		let csvFilePath: string;
		if (market === "KOSPI") {
			csvFilePath = path.resolve(__dirname, "../../resources/input/kospi_data_2420_20240512.csv");
		} else if (market === "KOSDAQ") {
			csvFilePath = path.resolve(__dirname, "../../resources/input/kosdaq_data_5304_20240517.csv");
		} else if (market === "KONEX") {
			csvFilePath = path.resolve(__dirname, "../../resources/input/konex_data_5336_20240517.csv");
		}

		// 출력 디렉토리 경로 설정
		const outputPath = path.resolve(__dirname, "../../resources/output");

		// CSV 파일을 JSON으로 변환
		await convertCsvToJson(csvFilePath, outputPath, market, (error) => {
			if (error) {
				console.error("Error:", error);
			}
		});
	}
}
