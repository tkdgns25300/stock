console.log("Loading function");

export const handler = async (event, context) => {
	try {
		/**
		 * 1. CSV 파일 다운로드
		 */
		const csvFilePath = path.resolve(__dirname, "../../../src/modules/utils/csvFolder");
		if (fs.existsSync(csvFilePath)) {
			fs.rmSync(csvFilePath, { recursive: true });
		}
		fs.mkdirSync(csvFilePath);

		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto("http://kind.krx.co.kr/corpgeneral/corpList.do?method=download", {
			waitUntil: "networkidle2",
		});

		await page.select("#marketType", "all");
		await page.click("#btnSearch");

		await page.waitForSelector("#grid1");
		await page.click("#grid1 > table > tbody > tr:nth-child(1) > td:nth-child(1) > input[type=checkbox]");

		await page.select("#downloadType", "file");
		await page.click("#btnDownload");

		await page.waitForTimeout(5000);
		await browser.close();

		const files = fs.readdirSync(csvFilePath);
		const companyInfoCsvFileName = files.find((file) => file.includes("CORPCODE"));
		const stockInfoCsvFileName = files.find((file) => file.includes("STOCKCODE"));

		if (!companyInfoCsvFileName || !stockInfoCsvFileName) {
			throw new Error("CSV 파일 다운로드 실패");
		}
	} catch (error) {
		throw error;
	}
};
