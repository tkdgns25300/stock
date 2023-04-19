import path from "path";
import puppeteer from "puppeteer";
import * as fs from "fs";
import csvtojson from "csvtojson";
import * as iconv from "iconv-lite";
import { Injectable } from "@nestjs/common";
import { convertCsvToJson } from "src/util/csvToJson";
import { writeFile } from "fs/promises";

@Injectable()
export class UtilsService {
	// async csvToJson(market: string): Promise<void> {
	// 	// CSV 파일 경로 설정
	// 	let csvFilePath: string;
	// 	if (market === "KOSPI") {
	// 		csvFilePath = path.resolve(__dirname, "../../resources/input/kospi_data_4615_20240518.csv");
	// 	} else if (market === "KOSDAQ") {
	// 		csvFilePath = path.resolve(__dirname, "../../resources/input/kosdaq_data_5304_20240517.csv");
	// 	} else if (market === "KONEX") {
	// 		csvFilePath = path.resolve(__dirname, "../../resources/input/konex_data_5336_20240517.csv");
	// 	}

	// 	// 출력 디렉토리 경로 설정
	// 	const outputPath = path.resolve(__dirname, "../../resources/output");

	// 	// CSV 파일을 JSON으로 변환
	// 	await convertCsvToJson(csvFilePath, outputPath, market, (error) => {
	// 		if (error) {
	// 			console.error("Error:", error);
	// 		}
	// 	});
	// }

	async scrapingCompanyDescription(market: string): Promise<string> {
		const jsonFilePath = path.resolve(__dirname, `../../resources/output/${market}.json`);
		const stockDataList = require(jsonFilePath).slice(0, 50);

		for (const stockData of stockDataList) {
			const url = `https://finance.naver.com/item/main.naver?code=${stockData["종목코드"]}`;

			try {
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.goto(url);

				const description = await page.evaluate(() => {
					let rawDescription = document.querySelector("#summary_info").textContent.trim();
					// Remove leading whitespaces and newlines
					rawDescription = rawDescription.replace(/^\s+/gm, "");
					// Remove "기업개요" and "출처 : 에프앤가이드"
					rawDescription = rawDescription.replace("기업개요", "").replace("출처 : 에프앤가이드", "");
					// Remove leading and trailing whitespaces
					rawDescription = rawDescription.trim();
					// Replace multiple newlines with a single newline
					rawDescription = rawDescription.replace(/\n+/g, "\n");
					// Add an extra newline after each paragraph
					rawDescription = rawDescription.replace(/\n/g, "\n\n");
					return rawDescription;
				});

				stockData["기업정보"] = description;

				await browser.close();
			} catch (error) {
				console.error("Error scraping data and saving:", error);
			}
		}

		// Save updated stockDataList back to the JSON file
		await writeFile(jsonFilePath, JSON.stringify(stockDataList, null, 2));

		console.log("Company description saved successfully");
		return "Company description scraped and saved successfully";
	}

	async csvToJsonFirst(market: string, date: string): Promise<string> {
		try {
			// 파일 경로 확인
			const csvFilePath = path.resolve(__dirname, `../../resources/input/${date}/${market}/company_info_${date}.csv`);
			const firstJsonFilePath = path.resolve(__dirname, `../../resources/output/${date}/${market}/first.json`);

			// CSV 파일 JSON화
			const csvData = fs.readFileSync(csvFilePath);
			const decodedData = iconv.decode(csvData, "EUC-KR");
			const jsonArray = await csvtojson().fromString(decodedData);

			// JSON에서 필요 정보 가져오기
			const filteredData = jsonArray.map((row: CompanyInfoCSVRowData) => ({
				종목코드: row["종목코드"],
				종목명: row["종목명"],
				시장구분: row["시장구분"],
				소속부: row["소속부"],
				업종코드: row["업종코드"],
				업종명: row["업종명"],
				결산월: row["결산월"],
				지정자문인: row["지정자문인"],
				상장주식수: row["상장주식수"],
				액면가: row["액면가"],
				자본금: row["자본금"],
				통화구분: row["통화구분"],
				대표이사: row["대표이사"],
				대표전화: row["대표전화"],
				주소: row["주소"],
			}));

			// 필요한 형식에 맞게 데이터 변환
			const convertedCompanyInfo = [];

			for (const data of filteredData) {
				let convertedCurData = {
					name: data["종목명"],
					detailed_name: null,
					english_name: null,
					description: null,
					industry_name: data["업종명"],
					industry_code: data["업종코드"],
					capital: data["자본금"],
					currency: data["통화구분"],
					fiscal_month: data["결산월"],
					ceo: data["대표이사"],
					main_phone: data["대표전화"],
					address: data["주소"],
					website: null,
					founded_date: null,
					stock_info: [
						{
							standard_code: null,
							stock_code: data["종목코드"],
							listing_date: null,
							face_value: data["액면가"],
							listed_shares: data["상장주식수"],
							market_type: data["시장구분"],
							stock_type: null,
							affiliation: data["소속부"],
							security_type: null,
						},
					],
				};

				convertedCompanyInfo.push(convertedCurData);
			}

			// json 파일 생성
			fs.writeFile(firstJsonFilePath, JSON.stringify(convertedCompanyInfo), (err) => {
				if (err) throw err;
				console.log("JSON 파일이 생성되었습니다.");
			});

			return "JSON 파일이 생성되었습니다.";
		} catch (error) {
			throw error;
		}
	}

	async csvToJsonSecond(market: string, date: string) {
		const csvFilePath = path.resolve(__dirname, `../../resources/input/${date}/${market}/stock_info_${date}.csv`);
		const firstJsonFilePath = path.resolve(__dirname, `../../resources/output/${date}/${market}/first.json`);
		const secondJsonFilePath = path.resolve(__dirname, `../../resources/output/${date}/${market}/second.json`);

		const csvData = fs.readFileSync(csvFilePath);
		const decodedData = iconv.decode(csvData, "EUC-KR");
		const jsonArray = await csvtojson().fromString(decodedData);

		const filteredData = jsonArray.map((row: StockInfoCSVRowData) => ({
			표준코드: row["표준코드"],
			단축코드: row["단축코드"],
			"한글 종목명": row["한글 종목명"],
			"한글 종목약명": row["한글 종목약명"],
			"영문 종목명": row["영문 종목명"],
			상장일: row["상장일"],
			시장구분: row["시장구분"],
			증권구분: row["증권구분"],
			소속부: row["소속부"],
			주식종류: row["주식종류"],
			액면가: row["액면가"],
			상장주식수: row["상장주식수"],
		}));

		// 파일 불러오기
		const jsonData = fs.readFileSync(firstJsonFilePath, "utf-8");
		const firstJsonData = JSON.parse(jsonData);

		// 필요한 형식에 맞게 데이터 변환
		const convertedCompanyStockInfo = [];

		for (const companyData of firstJsonData) {
			// 뼈대에 먼저 정보 기입
			let stockData = filteredData.find((e) => {
				return e["단축코드"] === companyData["stock_info"][0]["stock_code"];
			});
			if (stockData) {
				companyData["detailed_name"] = stockData["한글 종목명"];
				companyData["english_name"] = stockData["영문 종목명"];
				companyData["stock_info"][0]["standard_code"] = stockData["표준코드"];
				companyData["stock_info"][0]["listing_date"] = stockData["상장일"];
				companyData["stock_info"][0]["stock_type"] = stockData["주식종류"];
				companyData["stock_info"][0]["security_type"] = stockData["증권구분"];
			}

			// 우선주 등 있는지 확인 후 기입
			let otherStockData = filteredData.filter((e) => {
				return (
					e["단축코드"].slice(0, -1) === companyData["stock_info"][0]["stock_code"].slice(0, -1) &&
					e["단축코드"] !== companyData["stock_info"][0]["stock_code"]
				);
			});
			if (otherStockData.length !== 0) {
				for (const anotherStockData of otherStockData) {
					companyData["stock_info"].push({
						standard_code: anotherStockData["표준코드"],
						stock_code: anotherStockData["단축코드"],
						listing_date: anotherStockData["상장일"],
						face_value: anotherStockData["액면가"],
						listed_shares: anotherStockData["상장주식수"],
						market_type: anotherStockData["시장구분"],
						stock_type: anotherStockData["주식종류"],
						affiliation: anotherStockData["소속부"],
						security_type: anotherStockData["증권구분"],
					});
				}
			}

			convertedCompanyStockInfo.push(companyData);
		}

		// json 파일 생성
		fs.writeFile(secondJsonFilePath, JSON.stringify(convertedCompanyStockInfo), (err) => {
			if (err) throw err;
			console.log("JSON 파일이 생성되었습니다.");
		});

		return "JSON 파일이 생성되었습니다.";
	}
}
