import path from "path";
import puppeteer from "puppeteer";
import { Injectable } from "@nestjs/common";
import { convertCsvToJson } from "src/util/csvToJson";
import { writeFile } from "fs/promises";

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

	async saveCompanyDescription(market: string): Promise<string> {
		const jsonFilePath = path.resolve(__dirname, `../../resources/output/${market}.json`);
		const stockDataList = require(jsonFilePath).slice(0, 10);

		for (const stockData of stockDataList) {
			const url = `https://finance.naver.com/item/main.naver?code=${stockData["단축코드"]}`;

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
}
