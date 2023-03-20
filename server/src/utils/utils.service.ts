import path from "path";
import { Injectable } from "@nestjs/common";
import { convertCsvToJson } from "src/util/csvToJson";

@Injectable()
export class UtilsService {
	async csvToJson(): Promise<void> {
		// CSV 파일 경로와 출력 디렉토리 경로
		const csvFilePath = path.resolve(__dirname, "../../resources/input/data_2420_20240512.csv");
		const outputPath = path.resolve(__dirname, "../../resources/output");

		// KOSPI시장
		await convertCsvToJson(csvFilePath, outputPath, "KOSPI", (error) => {
			if (error) {
				console.error("Error:", error);
			}
		});
	}
}
