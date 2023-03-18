import * as fs from "fs";
import csvtojson = require("csvtojson");

// RowData 인터페이스 정의
interface RowData {
	단축코드: string;
	한글종목명: string;
	영문종목명: string;
	상장일: string;
	시장: string;
	액면가: string;
	상장주식수: string;
}

/**
 * CSV 파일의 특정 열 데이터를 JSON 형식으로 변환하고 저장하는 함수
 * @param {string} csvFilePath - 변환할 CSV 파일 경로
 * @param {string} outputPath - 변환된 JSON 파일이 저장될 디렉토리 경로
 * @param {string} market - 시장 이름
 * @param {(error: Error | null) => void} callback - 콜백 함수
 */
async function convertCsvToJson(
	csvFilePath: string,
	outputPath: string,
	market: string,
	callback: (error: Error | null) => void,
) {
	try {
		const jsonArray = await csvtojson().fromFile(csvFilePath);

		const filteredData = jsonArray.map((row: RowData) => ({
			단축코드: row["단축코드"],
			한글종목명: row["한글종목명"],
			영문종목명: row["영문종목명"],
			상장일: row["상장일"],
			시장: row["시장"],
			액면가: row["액면가"],
			상장주식수: row["상장주식수"],
		}));

		const jsonFilePath = `${outputPath}/${market}.json`;
		fs.writeFile(jsonFilePath, JSON.stringify(filteredData, null, 2), (err) => {
			if (err) {
				throw err; // 에러를 던져서 상위 호출 스택으로 전파
			} else {
				console.log(`JSON file for ${market} has been saved.`);
				callback(null);
			}
		});
	} catch (error) {
		throw error; // 에러를 던져서 상위 호출 스택으로 전파
	}
}

// CSV 파일 경로와 출력 디렉토리 경로
const csvFilePath = "../../data_2420_20240512.csv";
const outputPath = "../company";

// KOSPI시장
convertCsvToJson(csvFilePath, outputPath, "KOSPI", (error) => {
	if (error) {
		console.error("Error:", error);
	}
});
