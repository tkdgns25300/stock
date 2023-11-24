import path from "path";
import puppeteer from "puppeteer";
import * as fs from "fs";
import csvtojson from "csvtojson";
import * as iconv from "iconv-lite";
import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { StockInfo } from "src/entities/StockInfo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { getToken } from "src/util/token/token";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { BalanceSheet } from "src/entities/BalanceSheet.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";

@Injectable()
export class UtilsService {
	constructor(
		@InjectRepository(CompanyInfo)
		private companyInfoRepository: Repository<CompanyInfo>,
		@InjectRepository(StockInfo)
		private stockInfoRepository: Repository<StockInfo>,
		@InjectRepository(BalanceSheet)
		private balanceSheetRepository: Repository<BalanceSheet>,
		@InjectRepository(IncomeStatement)
		private incomeStatementRepository: Repository<IncomeStatement>,
		@InjectRepository(FinancialRatio)
		private financialRatioRepository: Repository<FinancialRatio>,
		@InjectRepository(ProfitRatio)
		private profitRatioRepository: Repository<ProfitRatio>,
	) {}

	async csvToJsonFirst(market: string, date: string): Promise<string> {
		try {
			// 파일 경로 확인
			const csvFilePath = path.resolve(__dirname, `../../resources/input/${date}/${market}/company_info_${date}.csv`);
			const firstJsonFilePath = path.resolve(__dirname, `../../resources/output/${date}/${market}/first.json`);

			// CSV 파일 JSON화
			const csvData = fs.readFileSync(csvFilePath);
			const decodedData = iconv.decode(csvData, "EUC-KR");
			// const jsonArray = await csvtojson().fromString(decodedData);

			// CSV 파서 옵션 설정
			const jsonArray = await csvtojson({
				colParser: {
					소속부: (item, head, resultRow, row, colIdx) => {
						// 첫 번째 소속부 컬럼 값만 사용
						if (resultRow["소속부"] === undefined) {
							return item;
						}
						return undefined; // 두 번째 소속부 컬럼 값 무시
					},
				},
			}).fromString(decodedData);

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

	async csvToJsonSecond(market: string, date: string): Promise<string> {
		try {
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
		} catch (error) {
			throw error;
		}
	}

	async csvToJsonThird(market: string, date: string): Promise<string> {
		try {
			const secondJsonFilePath = path.resolve(__dirname, `../../resources/output/${date}/${market}/second.json`);
			const thirdJsonFilePath = path.resolve(__dirname, `../../resources/output/${date}/${market}/third.json`);

			const jsonData = fs.readFileSync(secondJsonFilePath, "utf-8");
			const secondJsonData = JSON.parse(jsonData);

			const thirdJsonData = [];

			for (let i = 0; i < secondJsonData.length; i++) {
				// for (let i = 0; i <= 10; i++) {
				const urlForWebsiteFoundedDate = `https://comp.fnguide.com/SVO2/ASP/SVD_Corp.asp?pGB=1&gicode=A${secondJsonData[i].stock_info[0].stock_code}&cID=&MenuYn=Y&ReportGB=&NewMenuID=102&stkGb=701`;
				const urlForDescription = `https://comp.fnguide.com/SVO2/ASP/SVD_Main.asp?pGB=1&gicode=A${secondJsonData[i].stock_info[0].stock_code}&cID=&MenuYn=Y&ReportGB=&NewMenuID=101&stkGb=701`;

				const browser = await puppeteer.launch();
				const page1 = await browser.newPage();
				const page2 = await browser.newPage();

				await page1.goto(urlForWebsiteFoundedDate);
				await page2.goto(urlForDescription);

				// const website = await page1.$eval(
				// 	"#corpGeneralInfo > table > tbody > tr:nth-child(2) > td:nth-child(2) > a",
				// 	(el) => el.innerText,
				// );
				const websiteElement = await page1.$(
					"#corpGeneralInfo > table > tbody > tr:nth-child(2) > td:nth-child(2) > a",
				);
				const website = websiteElement ? await page1.evaluate((el) => el.innerText, websiteElement) : "";

				// const founded_date = await page1.$eval(
				// 	"#corpGeneralInfo > table > tbody > tr:nth-child(5) > td:nth-child(2)",
				// 	(el) => el.textContent.trim(),
				// );
				const foundedDateElement = await page1.$(
					"#corpGeneralInfo > table > tbody > tr:nth-child(5) > td:nth-child(2)",
				);
				const founded_date = foundedDateElement
					? await page1.evaluate((el) => el.textContent.trim(), foundedDateElement)
					: "";

				// const description = await page2.$eval("#bizSummaryContent > li:nth-child(1)", (el) => el.textContent.trim());
				const descriptionElement = await page2.$("#bizSummaryContent > li:nth-child(1)");
				const description = descriptionElement
					? await page2.evaluate((el) => el.textContent.trim(), descriptionElement)
					: "";

				await browser.close();

				secondJsonData[i].website = website;
				secondJsonData[i].founded_date = founded_date;
				secondJsonData[i].description = description;

				thirdJsonData.push(secondJsonData[i]);
			}

			fs.appendFileSync(thirdJsonFilePath, JSON.stringify(thirdJsonData));

			return "JSON 파일이 생성되었습니다.";
		} catch (error) {
			throw error;
		}
	}

	async jsonToDatabase(market: string, date: string): Promise<string> {
		// const thirdJsonFilePath = path.resolve(__dirname, `../../resources/output/${date}/${market}/third.json`);
		const thirdJsonFilePath = path.resolve(`./resources/output/${date}/${market}/third.json`);
		const jsonData = fs.readFileSync(thirdJsonFilePath, "utf-8");
		const ThirdJsonData = JSON.parse(jsonData);

		for (const companyInfoData of ThirdJsonData) {
			// Company Info 작성
			const companyInfo: CompanyInfo = new CompanyInfo();
			companyInfo.name = companyInfoData.name;
			companyInfo.detailed_name = companyInfoData.detailed_name;
			companyInfo.english_name = companyInfoData.english_name;
			companyInfo.description = companyInfoData.description || null;
			companyInfo.industry_name = companyInfoData.industry_name;
			companyInfo.industry_code = companyInfoData.industry_code;
			companyInfo.capital = Number(companyInfoData.capital);
			companyInfo.currency = companyInfoData.currency;
			companyInfo.fiscal_month = Number(companyInfoData.fiscal_month);
			companyInfo.ceo = companyInfoData.ceo;
			companyInfo.main_phone = companyInfoData.main_phone;
			companyInfo.address = companyInfoData.address;
			companyInfo.website = companyInfoData.website || null;
			companyInfo.founded_date = new Date(companyInfoData.founded_date) || null;
			companyInfo.stock_infos = companyInfoData.stock_info;

			// Stock Info 작성
			const stockInfoDataArr = [];
			for (const stockInfoData of companyInfoData.stock_info) {
				const stockInfo: StockInfo = new StockInfo();
				stockInfo.standard_code = stockInfoData.standard_code;
				stockInfo.stock_code = stockInfoData.stock_code;
				stockInfo.listing_date = new Date(stockInfoData.listing_date);
				stockInfo.face_value = stockInfoData.face_value;
				stockInfo.listed_shares = Number(stockInfoData.listed_shares);
				stockInfo.market_type = stockInfoData.market_type;
				stockInfo.stock_type = stockInfoData.stock_type;
				stockInfo.affiliation = stockInfoData.affiliation || null;
				stockInfo.security_type = stockInfoData.security_type;
				stockInfo.company_info = companyInfo;

				await this.stockInfoRepository.save(stockInfo);
				stockInfoDataArr.push(stockInfo);
			}

			companyInfo.stock_infos = stockInfoDataArr;
			await this.companyInfoRepository.save(companyInfo);
		}

		return "DB 데이터가 생성되었습니다.";
	}

	async financialInfoToDatabase(): Promise<ApiResponse<{}>> {
		const stockInfo = await this.stockInfoRepository.find();

		for (const stock of stockInfo) {
			// Get Financial Information
			const token = await getToken();
			const headers = {
				"Content-Type": "application/json; charset=utf-8",
				appkey: process.env.KIS_APP_KEY,
				appsecret: process.env.KIS_APP_SECRET,
				Authorization: `Bearer ${token}`,
				custtype: "P",
			};
			const query = `fid_div_cls_code=1&fid_cond_mrkt_div_code=J&fid_input_iscd=${stock.stock_code}`;

			const balanceSheetResponse = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/finance/balance-sheet?${query}`,
				{
					method: "GET",
					headers: { ...headers, tr_id: "FHKST66430100" },
				},
			).then((res) => res.json());
			const balanceSheetDataArray = await balanceSheetResponse.output;

			const incomeStatementResponse = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/finance/balance-sheet?${query}`,
				{
					method: "GET",
					headers: { ...headers, tr_id: "FHKST66430200" },
				},
			).then((res) => res.json());
			const incomeStatementDataArray = await incomeStatementResponse.output;

			const financialRatioResponse = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/finance/balance-sheet?${query}`,
				{
					method: "GET",
					headers: { ...headers, tr_id: "FHKST66430300" },
				},
			).then((res) => res.json());
			const financialRatioDataArray = await financialRatioResponse.output;

			const profitRatioResponse = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/finance/balance-sheet?${query}`,
				{
					method: "GET",
					headers: { ...headers, tr_id: "FHKST66430400" },
				},
			).then((res) => res.json());
			const ProfitRatioDataArray = await profitRatioResponse.output;

			// Store Financial Information into DB
			if (balanceSheetDataArray && balanceSheetDataArray.length !== 0) {
				for (const balanceSheetData of balanceSheetDataArray) {
					const balanceSheet = this.balanceSheetRepository.create({ ...balanceSheetData, stock_info: stock });
					await this.balanceSheetRepository.save(balanceSheet);
				}
			}

			if (incomeStatementDataArray && incomeStatementDataArray.length !== 0) {
				for (const incomeStatementData of incomeStatementDataArray) {
					const incomeStatement = this.incomeStatementRepository.create({ ...incomeStatementData, stock_info: stock });
					await this.incomeStatementRepository.save(incomeStatement);
				}
			}

			if (financialRatioDataArray && financialRatioDataArray.length !== 0) {
				for (const financialRatioData of financialRatioDataArray) {
					const financialRatio = this.financialRatioRepository.create({ ...financialRatioData, stock_info: stock });
					await this.financialRatioRepository.save(financialRatio);
				}
			}

			if (ProfitRatioDataArray && ProfitRatioDataArray.length !== 0) {
				for (const ProfitRatioData of ProfitRatioDataArray) {
					const profitRatio = this.profitRatioRepository.create({ ...ProfitRatioData, stock_info: stock });
					await this.profitRatioRepository.save(profitRatio);
				}
			}
		}

		return new ApiResponse({}, "Successfully fetched financial info");
	}

	async balanceSheetToDatabase(): Promise<ApiResponse<string[]>> {
		const stockInfo = await this.stockInfoRepository.find();
		let failedStocks: string[] = [];

		for (const stock of stockInfo) {
			try {
				await this.fetchAndSaveData(stock, "balance-sheet");
			} catch (error) {
				console.error(`Failed to fetch balance-sheet for ${stock.stock_code}: ${error.message}`);
				failedStocks.push(stock.stock_code);
			}
		}

		if (failedStocks.length > 0) {
			console.log(`Initial failed fetches for balance-sheet: ${failedStocks.join(", ")}`);
			failedStocks = await this.retryFailedFetches(failedStocks, "balance-sheet");
		}

		return new ApiResponse(failedStocks, "Successfully fetched and saved all balance-sheet data, with some failures");
	}

	async retryFailedBalanceSheetToDatabase(failedStocks: string[]): Promise<ApiResponse<string[]>> {
		await this.balanceSheetRepository
			.createQueryBuilder()
			.delete()
			.from(BalanceSheet)
			.where("stock_code IN (:...stockCodes)", { stockCodes: failedStocks })
			.execute();
		failedStocks = await this.retryFailedFetches(failedStocks, "balance-sheet");
		return new ApiResponse(failedStocks, "Successfully fetched and saved all balance-sheet data, with some failures");
	}

	async incomeStatementToDatabase(): Promise<ApiResponse<string[]>> {
		const stockInfo = await this.stockInfoRepository.find();
		let failedStocks: string[] = [];

		for (const stock of stockInfo) {
			try {
				await this.fetchAndSaveData(stock, "income-statement");
			} catch (error) {
				console.error(`Failed to fetch income-statement for ${stock.stock_code}: ${error.message}`);
				failedStocks.push(stock.stock_code);
			}
		}

		if (failedStocks.length > 0) {
			console.log(`Initial failed fetches for income-statement: ${failedStocks.join(", ")}`);
			failedStocks = await this.retryFailedFetches(failedStocks, "income-statement");
		}

		return new ApiResponse(
			failedStocks,
			"Successfully fetched and saved all income-statement data, with some failures",
		);
	}

	async retryFailedIncomeStatementToDatabase(failedStocks: string[]): Promise<ApiResponse<string[]>> {
		await this.incomeStatementRepository
			.createQueryBuilder()
			.delete()
			.from(IncomeStatement)
			.where("stock_code IN (:...stockCodes)", { stockCodes: failedStocks })
			.execute();

		failedStocks = await this.retryFailedFetches(failedStocks, "income-statement");
		return new ApiResponse(
			failedStocks,
			"Successfully fetched and saved all income-statement data, with some failures",
		);
	}

	async financialRatioToDatabase(): Promise<ApiResponse<string[]>> {
		const stockInfo = await this.stockInfoRepository.find();
		let failedStocks: string[] = [];

		for (const stock of stockInfo) {
			try {
				await this.fetchAndSaveData(stock, "financial-ratio");
			} catch (error) {
				console.error(`Failed to fetch financial-ratio for ${stock.stock_code}: ${error.message}`);
				failedStocks.push(stock.stock_code);
			}
		}

		if (failedStocks.length > 0) {
			console.log(`Initial failed fetches for financial-ratio: ${failedStocks.join(", ")}`);
			failedStocks = await this.retryFailedFetches(failedStocks, "financial-ratio");
		}

		return new ApiResponse(failedStocks, "Successfully fetched and saved all financial-ratio data, with some failures");
	}

	async retryFailedFinancialRatioToDatabase(failedStocks: string[]): Promise<ApiResponse<string[]>> {
		await this.financialRatioRepository
			.createQueryBuilder()
			.delete()
			.from(FinancialRatio)
			.where("stock_code IN (:...stockCodes)", { stockCodes: failedStocks })
			.execute();

		failedStocks = await this.retryFailedFetches(failedStocks, "financial-ratio");
		return new ApiResponse(failedStocks, "Successfully fetched and saved all financial-ratio data, with some failures");
	}

	async profitRatioToDatabase(): Promise<ApiResponse<string[]>> {
		const stockInfo = await this.stockInfoRepository.find();
		let failedStocks: string[] = [];

		for (const stock of stockInfo) {
			try {
				await this.fetchAndSaveData(stock, "profit-ratio");
			} catch (error) {
				console.error(`Failed to fetch profit-ratio for ${stock.stock_code}: ${error.message}`);
				failedStocks.push(stock.stock_code);
			}
		}

		if (failedStocks.length > 0) {
			console.log(`Initial failed fetches for profit-ratio: ${failedStocks.join(", ")}`);
			failedStocks = await this.retryFailedFetches(failedStocks, "profit-ratio");
		}

		return new ApiResponse(failedStocks, "Successfully fetched and saved all profit-ratio data, with some failures");
	}

	async retryFailedProfitRatioToDatabase(failedStocks: string[]): Promise<ApiResponse<string[]>> {
		await this.profitRatioRepository
			.createQueryBuilder()
			.delete()
			.from(ProfitRatio)
			.where("stock_code IN (:...stockCodes)", { stockCodes: failedStocks })
			.execute();

		failedStocks = await this.retryFailedFetches(failedStocks, "profit-ratio");
		return new ApiResponse(failedStocks, "Successfully fetched and saved all profit-ratio data, with some failures");
	}

	async retryFailedFetches(failedStocks: string[], type: string): Promise<string[]> {
		const retryLimit = 3;
		const retryDelay = 1000; // 1 second

		for (let attempt = 1; attempt <= retryLimit; attempt++) {
			console.log(`Retry attempt ${attempt} for failed fetches`);
			const remainingFailedStocks: string[] = [];

			for (const stockCode of failedStocks) {
				try {
					await this.fetchAndSaveData({ stock_code: stockCode }, type);
				} catch (error) {
					console.error(`Retry failed to fetch ${type} for ${stockCode}: ${error.message}`);
					remainingFailedStocks.push(stockCode);
				}
			}

			if (remainingFailedStocks.length === 0) {
				console.log(`All retries succeeded for ${type}`);
				break;
			} else {
				console.log(`Remaining failed fetches for ${type}: ${remainingFailedStocks.join(", ")}`);
				failedStocks = remainingFailedStocks;
				await new Promise((res) => setTimeout(res, retryDelay));
			}
		}

		if (failedStocks.length > 0) {
			console.error(`Failed to fetch ${type} after ${retryLimit} attempts: ${failedStocks.join(", ")}`);
		}

		return failedStocks.length === 0 ? [] : failedStocks;
	}

	async fetchAndSaveData(stock: any, type: string): Promise<void> {
		const token = await getToken();
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			appkey: process.env.KIS_APP_KEY,
			appsecret: process.env.KIS_APP_SECRET,
			Authorization: `Bearer ${token}`,
			custtype: "P",
		};
		const query = `fid_div_cls_code=1&fid_cond_mrkt_div_code=J&fid_input_iscd=${stock.stock_code}`;

		const tr_id =
			type === "balance-sheet"
				? "FHKST66430100"
				: type === "income-statement"
				? "FHKST66430200"
				: type === "financial-ratio"
				? "FHKST66430300"
				: "FHKST66430400";

		const response = await fetch(
			`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/finance/balance-sheet?${query}`,
			{
				method: "GET",
				headers: { ...headers, tr_id },
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch ${type} for ${stock.stock_code}: ${response.statusText}`);
		}

		const dataResponse = await response.json();
		const dataArray = dataResponse.output;

		if (dataArray && dataArray.length !== 0) {
			let repository: Repository<any>;

			switch (type) {
				case "balance-sheet":
					repository = this.balanceSheetRepository;
					break;
				case "income-statement":
					repository = this.incomeStatementRepository;
					break;
				case "financial-ratio":
					repository = this.financialRatioRepository;
					break;
				case "profit-ratio":
					repository = this.profitRatioRepository;
					break;
				default:
					throw new Error(`Unknown type: ${type}`);
			}

			for (const data of dataArray) {
				const entity = repository.create({ ...data, stock_info: stock });
				await repository.save(entity);
			}
		}
	}

	async databaseUpdate(): Promise<ApiResponse<null[]>> {
		try {
			return new ApiResponse(null, "Successfully fetched and saved all profit-ratio data, with some failures");
		} catch (error) {
			throw error;
		}
	}
}
