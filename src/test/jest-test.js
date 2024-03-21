// asyncFunctions.js
async function fetchData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
}

// userService.js
import { fetchData } from "./asyncFunctions";

export async function getUserData(userId) {
	const url = `https://api.example.com/users/${userId}`;
	try {
		const userData = await fetchData(url);
		return userData;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
}

// userService.test.js
import { getUserData } from "./userService";
import { fetchData } from "./asyncFunctions";

jest.mock("./asyncFunctions");

describe("getUserData 함수", () => {
	test("유효한 사용자 ID를 제공하면 사용자 데이터를 반환합니다.", async () => {
		const mockUserData = { id: 1, name: "John Doe" };
		fetchData.mockResolvedValueOnce(mockUserData);

		const userId = 1;
		const userData = await getUserData(userId);

		expect(userData).toEqual(mockUserData);
		expect(fetchData).toHaveBeenCalledWith(`https://api.example.com/users/${userId}`);
	});

	test("API 호출이 실패하면 에러를 반환합니다.", async () => {
		const errorMessage = "Failed to fetch data";
		fetchData.mockRejectedValueOnce(new Error(errorMessage));

		const userId = 2;

		await expect(getUserData(userId)).rejects.toThrowError("Error fetching user data");
		expect(fetchData).toHaveBeenCalledWith(`https://api.example.com/users/${userId}`);
	});
});
