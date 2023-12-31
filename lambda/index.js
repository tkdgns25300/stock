console.log("Loading function");

const axios = require("axios");

exports.handler = async (event) => {
	const apiUrl = "https://server.stockpedia.online/api-server/v1/utils/database-update";
	const apiUrl1 = "https://server.stockpedia.online/api-server/v1/company/search?name=삼성전자";

	try {
		// const response = await axios.post(apiUrl);
		const response = await axios.get(apiUrl1);

		console.log("API 호출 성공:", response.data);
		return {
			statusCode: 200,
			body: JSON.stringify({ message: "API 호출 성공" }),
		};
	} catch (error) {
		console.error("API 호출 실패:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "API 호출 실패" }),
		};
	}
};

// export const handler = async (event, context) => {
// 	try {
// 		/**
// 		 * 1. CSV 파일 다운로드
// 		 */
// 		const csvFilePath = path.resolve(__dirname, "./csvFolder");
// 		if (fs.existsSync(csvFilePath)) {
// 			fs.rmSync(csvFilePath, { recursive: true });
// 		}
// 		fs.mkdirSync(csvFilePath);

// 		const browser = await puppeteer.launch();
// 		const page = await browser.newPage();
// 		await page.goto("http://kind.krx.co.kr/corpgeneral/corpList.do?method=download", {
// 			waitUntil: "networkidle2",
// 		});

// 		await page.select("#marketType", "all");
// 		await page.click("#btnSearch");

// 		await page.waitForSelector("#grid1");
// 		await page.click("#grid1 > table > tbody > tr:nth-child(1) > td:nth-child(1) > input[type=checkbox]");

// 		await page.select("#downloadType", "file");
// 		await page.click("#btnDownload");

// 		await page.waitForTimeout(5000);
// 		await browser.close();

// 		const files = fs.readdirSync(csvFilePath);
// 		const companyInfoCsvFileName = files.find((file) => file.includes("CORPCODE"));
// 		const stockInfoCsvFileName = files.find((file) => file.includes("STOCKCODE"));

// 		if (!companyInfoCsvFileName || !stockInfoCsvFileName) {
// 			throw new Error("CSV 파일 다운로드 실패");
// 		}

// 		/**
// 		 * 2. CSV to JSON
// 		 */
// 		const jsonFilePath = path.resolve(__dirname, "./jsonFolder");
// 		if (fs.existsSync(jsonFilePath)) {
// 			fs.rmSync(jsonFilePath, { recursive: true });
// 		}
// 		fs.mkdirSync(jsonFilePath);

// 		const formattedDate = getFormattedDate();

// 		// first json
// 		const companyCsvData = fs.readFileSync(`${csvFilePath}/company_info_${formattedDate}.csv`);
// 		const companyDecodedData = iconv.decode(companyCsvData, "EUC-KR");
// 		const firstJsonArray = await csvtojson({
// 			colParser: {
// 				소속부: (item, head, resultRow, row, colIdx) => {
// 					// 첫 번째 소속부 컬럼 값만 사용
// 					if (resultRow["소속부"] === undefined) {
// 						return item;
// 					}
// 					return undefined; // 두 번째 소속부 컬럼 값 무시
// 				},
// 			},
// 		}).fromString(companyDecodedData);

// 		const companyFilteredData = firstJsonArray.map((row) => ({
// 			종목코드: row["종목코드"],
// 			종목명: row["종목명"],
// 			시장구분: row["시장구분"],
// 			소속부: row["소속부"],
// 			업종코드: row["업종코드"],
// 			업종명: row["업종명"],
// 			결산월: row["결산월"],
// 			지정자문인: row["지정자문인"],
// 			상장주식수: row["상장주식수"],
// 			액면가: row["액면가"],
// 			자본금: row["자본금"],
// 			통화구분: row["통화구분"],
// 			대표이사: row["대표이사"],
// 			대표전화: row["대표전화"],
// 			주소: row["주소"],
// 		}));

// 		const convertedCompanyInfo = [];

// 		for (const data of companyFilteredData) {
// 			let convertedCurData = {
// 				name: data["종목명"],
// 				detailed_name: null,
// 				english_name: null,
// 				description: null,
// 				industry_name: data["업종명"],
// 				industry_code: data["업종코드"],
// 				capital: data["자본금"],
// 				currency: data["통화구분"],
// 				fiscal_month: data["결산월"],
// 				ceo: data["대표이사"],
// 				main_phone: data["대표전화"],
// 				address: data["주소"],
// 				website: null,
// 				founded_date: null,
// 				stock_info: [
// 					{
// 						standard_code: null,
// 						stock_code: data["종목코드"],
// 						listing_date: null,
// 						face_value: data["액면가"],
// 						listed_shares: data["상장주식수"],
// 						market_type: data["시장구분"],
// 						stock_type: null,
// 						affiliation: data["소속부"],
// 						security_type: null,
// 					},
// 				],
// 			};

// 			convertedCompanyInfo.push(convertedCurData);
// 		}

// 		await fs.promises.writeFile(`${jsonFilePath}/first.json`, JSON.stringify(convertedCompanyInfo));
// 		console.log("첫번째 JSON 파일이 생성되었습니다.");

// 		// second json
// 		const stockCsvData = fs.readFileSync(`${csvFilePath}/stock_info_${formattedDate}.csv`);
// 		const stockDecodedData = iconv.decode(stockCsvData, "EUC-KR");
// 		const secondJsonArray = await csvtojson().fromString(stockDecodedData);

// 		const stockFilteredData = secondJsonArray.map((row) => ({
// 			표준코드: row["표준코드"],
// 			단축코드: row["단축코드"],
// 			"한글 종목명": row["한글 종목명"],
// 			"한글 종목약명": row["한글 종목약명"],
// 			"영문 종목명": row["영문 종목명"],
// 			상장일: row["상장일"],
// 			시장구분: row["시장구분"],
// 			증권구분: row["증권구분"],
// 			소속부: row["소속부"],
// 			주식종류: row["주식종류"],
// 			액면가: row["액면가"],
// 			상장주식수: row["상장주식수"],
// 		}));

// 		const companyJsonData = fs.readFileSync(`${jsonFilePath}/first.json`, "utf-8");
// 		const firstJsonData = JSON.parse(companyJsonData);

// 		const convertedCompanyStockInfo = [];

// 		for (const companyData of firstJsonData) {
// 			// 뼈대에 먼저 정보 기입
// 			let stockData = stockFilteredData.find((e) => {
// 				return e["단축코드"] === companyData["stock_info"][0]["stock_code"];
// 			});
// 			if (stockData) {
// 				companyData["detailed_name"] = stockData["한글 종목명"];
// 				companyData["english_name"] = stockData["영문 종목명"];
// 				companyData["stock_info"][0]["standard_code"] = stockData["표준코드"];
// 				companyData["stock_info"][0]["listing_date"] = stockData["상장일"];
// 				companyData["stock_info"][0]["stock_type"] = stockData["주식종류"];
// 				companyData["stock_info"][0]["security_type"] = stockData["증권구분"];
// 			}

// 			// 우선주 등 있는지 확인 후 기입
// 			let otherStockData = stockFilteredData.filter((e) => {
// 				return (
// 					e["단축코드"].slice(0, -1) === companyData["stock_info"][0]["stock_code"].slice(0, -1) &&
// 					e["단축코드"] !== companyData["stock_info"][0]["stock_code"]
// 				);
// 			});
// 			if (otherStockData.length !== 0) {
// 				for (const anotherStockData of otherStockData) {
// 					companyData["stock_info"].push({
// 						standard_code: anotherStockData["표준코드"],
// 						stock_code: anotherStockData["단축코드"],
// 						listing_date: anotherStockData["상장일"],
// 						face_value: anotherStockData["액면가"],
// 						listed_shares: anotherStockData["상장주식수"],
// 						market_type: anotherStockData["시장구분"],
// 						stock_type: anotherStockData["주식종류"],
// 						affiliation: anotherStockData["소속부"],
// 						security_type: anotherStockData["증권구분"],
// 					});
// 				}
// 			}

// 			convertedCompanyStockInfo.push(companyData);
// 		}

// 		await fs.promises.writeFile(`${jsonFilePath}/second.json`, JSON.stringify(convertedCompanyStockInfo));
// 		console.log("두번째 JSON 파일이 생성되었습니다.");

// 		/**
// 		 * 3. 없는 회사(종목) 구분
// 		 */
// 		const companyStockJsonData = await fs.promises.readFile(`${jsonFilePath}/second.json`, "utf-8");
// 		const secondJsonData = JSON.parse(companyStockJsonData);
// 		const curDatabaseStockInfo = await this.stockInfoRepository.find();

// 		const thirdJsonData = secondJsonData.filter((companyInfo) => {
// 			return companyInfo.stock_info.every((e) => {
// 				return !curDatabaseStockInfo.some((stockInfo) => {
// 					return e.stock_code === stockInfo.stock_code;
// 				});
// 			});
// 		});

// 		/**
// 		 * 4. 해당 회사(종목) 데이터 가져오기
// 		 */
// 		const finalJsonData = [];
// 		for (let i = 0; i < thirdJsonData.length; i++) {
// 			const urlForWebsiteFoundedDate = `https://comp.fnguide.com/SVO2/ASP/SVD_Corp.asp?pGB=1&gicode=A${thirdJsonData[i].stock_info[0].stock_code}&cID=&MenuYn=Y&ReportGB=&NewMenuID=102&stkGb=701`;
// 			const urlForDescription = `https://comp.fnguide.com/SVO2/ASP/SVD_Main.asp?pGB=1&gicode=A${thirdJsonData[i].stock_info[0].stock_code}&cID=&MenuYn=Y&ReportGB=&NewMenuID=101&stkGb=701`;

// 			const browser = await puppeteer.launch();
// 			const page1 = await browser.newPage();
// 			const page2 = await browser.newPage();

// 			await page1.goto(urlForWebsiteFoundedDate);
// 			await page2.goto(urlForDescription);

// 			const websiteElement = await page1.$("#corpGeneralInfo > table > tbody > tr:nth-child(2) > td:nth-child(2) > a");
// 			const website = websiteElement ? await page1.evaluate((el) => el.innerText, websiteElement) : "";

// 			const foundedDateElement = await page1.$("#corpGeneralInfo > table > tbody > tr:nth-child(5) > td:nth-child(2)");
// 			const founded_date = foundedDateElement
// 				? await page1.evaluate((el) => el.textContent.trim(), foundedDateElement)
// 				: "";

// 			const descriptionElement = await page2.$("#bizSummaryContent > li:nth-child(1)");
// 			const description = descriptionElement
// 				? await page2.evaluate((el) => el.textContent.trim(), descriptionElement)
// 				: "";

// 			await browser.close();

// 			thirdJsonData[i].website = website === " " ? "" : website;
// 			thirdJsonData[i].founded_date = founded_date;
// 			thirdJsonData[i].description = description === "관련 데이터가 없습니다." ? "" : description;

// 			finalJsonData.push(thirdJsonData[i]);
// 		}

// 		await fs.promises.writeFile(`${jsonFilePath}/third.json`, JSON.stringify(finalJsonData));
// 		console.log("세번째 JSON 파일이 생성되었습니다.");

// 		/**
// 		 * 5. DB에 저장
// 		 */
// 		for (const companyInfoData of finalJsonData) {
// 			await this.companyInfoRepository.delete({ detailed_name: companyInfoData.detailed_name });

// 			// Company Info 작성
// 			const companyInfo = new CompanyInfo();
// 			companyInfo.name = companyInfoData.name;
// 			companyInfo.detailed_name = companyInfoData.detailed_name;
// 			companyInfo.english_name = companyInfoData.english_name;
// 			companyInfo.description = companyInfoData.description || null;
// 			companyInfo.industry_name = companyInfoData.industry_name;
// 			companyInfo.industry_code = companyInfoData.industry_code;
// 			companyInfo.capital = Number(companyInfoData.capital);
// 			companyInfo.currency = companyInfoData.currency;
// 			companyInfo.fiscal_month = Number(companyInfoData.fiscal_month);
// 			companyInfo.ceo = companyInfoData.ceo;
// 			companyInfo.main_phone = companyInfoData.main_phone;
// 			companyInfo.address = companyInfoData.address;
// 			companyInfo.website = companyInfoData.website || null;
// 			companyInfo.founded_date = new Date(companyInfoData.founded_date) || null;
// 			companyInfo.stock_infos = companyInfoData.stock_info;

// 			const stockInfoDataArr = [];
// 			for (const stockInfoData of companyInfoData.stock_info) {
// 				await this.stockInfoRepository.delete({ standard_code: stockInfoData.standard_code });

// 				// Stock Info 작성
// 				const stockInfo = new StockInfo();
// 				stockInfo.standard_code = stockInfoData.standard_code;
// 				stockInfo.stock_code = stockInfoData.stock_code;
// 				stockInfo.listing_date = new Date(stockInfoData.listing_date);
// 				stockInfo.face_value = stockInfoData.face_value;
// 				stockInfo.listed_shares = Number(stockInfoData.listed_shares);
// 				stockInfo.market_type = stockInfoData.market_type;
// 				stockInfo.stock_type = stockInfoData.stock_type;
// 				stockInfo.affiliation = stockInfoData.affiliation || null;
// 				stockInfo.security_type = stockInfoData.security_type;
// 				stockInfo.company_info = companyInfo;

// 				await this.stockInfoRepository.save(stockInfo);
// 				stockInfoDataArr.push(stockInfo);
// 			}

// 			companyInfo.stock_infos = stockInfoDataArr;
// 			await this.companyInfoRepository.save(companyInfo);
// 		}

// 		console.log("Successfully Update Database");
// 	} catch (error) {
// 		throw error;
// 	}
// };
