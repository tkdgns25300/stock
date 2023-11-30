import { getFormattedDate } from "./formattedData";
import * as fs from "fs";
import path from "path";

export async function downloadFile(page, downloadPath, buttonSelector, fileNamePrefix) {
	await page.waitForSelector(buttonSelector, { timeout: 5000 });
	await page.click(buttonSelector);

	const downloadedFiles = fs.readdirSync(downloadPath);
	if (downloadedFiles.length > 0) {
		const formattedDate = getFormattedDate();
		const newFileName = `${fileNamePrefix}_${formattedDate}.csv`;
		const fileToRename = downloadedFiles.find((file) => !file.startsWith(fileNamePrefix));

		if (fileToRename) {
			const oldFilePath = path.join(downloadPath, fileToRename);
			const newFilePath = path.join(downloadPath, newFileName);
			fs.renameSync(oldFilePath, newFilePath);
			console.log(`다운로드된 파일을 ${newFileName}으로 이름을 변경했습니다.`);
		} else {
			console.log(`${fileNamePrefix}에 대한 새로운 파일이 다운로드되지 않았습니다.`);
		}
	} else {
		console.log(`${fileNamePrefix}에 대한 다운로드된 파일이 없습니다.`);
	}
}
