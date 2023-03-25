import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class CompanyService {
	async getCompanyDescription(stockCode: string): Promise<string> {
		const url = `https://finance.naver.com/item/main.naver?code=${stockCode}`;

		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(url);

			const description = await page.evaluate(() => {
				return document.querySelector("#summary_info").textContent.trim();
			});

			// description에서 "기업 개요"부분 삭제 및 전체적으로 글 정리 필요

			await browser.close();
			return description;
		} catch (error) {
			console.error("Error scraping data:", error);
			return "Failed to retrieve data";
		}
	}

	async getCompanyWebsite(stockCode: string): Promise<string> {
		const url = `https://cdn.fnguide.com/SVO2/ASP/SVD_Corp.asp?pGB=1&gicode=A${stockCode}&cID=&MenuYn=Y&ReportGB=&NewMenuID=102&stkGb=701`;

		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(url);

			const website = await page.evaluate(() => {
				return document
					.querySelector("#corpGeneralInfo > table > tbody > tr:nth-child(2) > td:nth-child(2) > a")
					.textContent.trim();
			});

			await browser.close();
			return website;
		} catch (error) {
			console.error("Error scraping data:", error);
			return "Failed to retrieve data";
		}
	}
}
