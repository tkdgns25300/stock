export function getFormattedDate() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}${month}${day}`;
}
