import * as fs from "fs";
import csvtojson from "csvtojson";
import * as iconv from "iconv-lite";

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
export async function convertCsvToJson(
	csvFilePath: string,
	outputPath: string,
	market: string,
	callback: (error: Error | null) => void,
) {
	try {
		const csvData = fs.readFileSync(csvFilePath);
		const decodedData = iconv.decode(csvData, "EUC-KR"); // CSV 파일의 실제 인코딩에 맞게 설정

		const jsonArray = await csvtojson().fromString(decodedData);

		const filteredData = jsonArray.map((row: RowData) => ({
			단축코드: row["단축코드"],
			한글종목명: row["한글 종목명"],
			영문종목명: row["영문 종목명"],
			상장일: row["상장일"],
			시장: row["시장구분"],
			액면가: row["액면가"],
			상장주식수: row["상장주식수"],
		}));

		const jsonFilePath = `${outputPath}/${market}.json`;
		fs.writeFile(jsonFilePath, JSON.stringify(filteredData, null, 2), (err) => {
			if (err) {
				throw err;
			} else {
				console.log(`JSON file for ${market} has been saved.`);
				callback(null);
			}
		});
	} catch (error) {
		throw error;
	}
}
