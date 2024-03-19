// api.test.js
const axios = require("axios");
const fetchData = require("./api");

jest.mock("axios");

describe("fetchData 함수", () => {
	test("API에서 데이터를 성공적으로 가져옵니다.", async () => {
		const mockData = { id: 1, name: "John Doe" };
		axios.get.mockResolvedValueOnce({ data: mockData });

		const url = "https://example.com/api/data";
		const data = await fetchData(url);

		expect(data).toEqual(mockData);
		expect(axios.get).toHaveBeenCalledWith(url);
	});

	test("API에서 데이터를 가져오지 못할 경우 에러를 반환합니다.", async () => {
		const errorMessage = "Failed to fetch data";
		axios.get.mockRejectedValueOnce(new Error(errorMessage));

		const url = "https://example.com/api/data";

		await expect(fetchData(url)).rejects.toThrow("Error fetching data");
		expect(axios.get).toHaveBeenCalledWith(url);
	});
});
