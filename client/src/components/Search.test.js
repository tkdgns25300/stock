import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "../components/Search";

// Mock fetch for testing
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				result: [
					{ company_name: "Test Company A", stock_code: "12345", stock_type: "보통주" },
					{ company_name: "Test Company B", stock_code: "67890", stock_type: "보통주" },
				],
			}),
	}),
);

describe("Search Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders input field and handles user input", () => {
		render(<Search />);

		const input = screen.getByPlaceholderText("회사명/종목 코드를 입력해주세요");

		// Simulate typing in the input field
		fireEvent.change(input, { target: { value: "Test" } });

		expect(input).toHaveValue("Test");
	});

	test("displays dropdown list when input value changes", async () => {
		render(<Search />);

		const input = screen.getByPlaceholderText("회사명/종목 코드를 입력해주세요");

		// Simulate typing in the input field
		fireEvent.change(input, { target: { value: "Test" } });

		// Wait for the dropdown list to appear
		await waitFor(() => screen.getByText("Test Company A"));

		expect(screen.getByText("Test Company A")).toBeInTheDocument();
		expect(screen.getByText("Test Company B")).toBeInTheDocument();
	});
});
