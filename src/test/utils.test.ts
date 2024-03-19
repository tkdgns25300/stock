// utils.test.js
const { multiply, divide } = require("./utils");

describe("multiply 함수", () => {
	test("두 숫자를 곱합니다.", () => {
		expect(multiply(2, 3)).toBe(6);
	});

	test("하나 이상의 음수가 있는 경우 음수를 반환합니다.", () => {
		expect(multiply(-2, 3)).toBeLessThan(0);
	});

	test("0과 곱하면 0을 반환합니다.", () => {
		expect(multiply(2, 0)).toBe(0);
	});
});

describe("divide 함수", () => {
	test("두 숫자를 나눕니다.", () => {
		expect(divide(6, 3)).toBe(2);
	});

	test("0으로 나눌 때 에러를 던집니다.", () => {
		expect(() => {
			divide(6, 0);
		}).toThrow("Cannot divide by zero");
	});
});
