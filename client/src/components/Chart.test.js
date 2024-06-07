import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chart from "../components/Chart";
import { PeriodDiv } from "../types/Chart/enum";

// Mock the fetch function
global.fetch = jest.fn();

describe("Chart Component", () => {
	const mockStockCode = "AAPL";

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test("renders loading state and then chart data", async () => {
		const mockChartData = {
			result: [
				{
					stckBsopDate: "20240101",
					stckOprc: "150.00",
					stckClpr: "155.00",
					stckHgpr: "160.00",
					stckLwpr: "145.00",
					acmlVol: "100000",
				},
			],
		};

		const mockPriceInfoData = {
			result: {
				stckPrpr: "155.00",
				prdyVrss: "5.00",
				prdyVrssSign: "+",
			},
		};

		fetch.mockImplementation((url) => {
			if (url.includes("/company/chart-data")) {
				return Promise.resolve({
					json: () => Promise.resolve(mockChartData),
				});
			} else if (url.includes("/company/price-info")) {
				return Promise.resolve({
					json: () => Promise.resolve(mockPriceInfoData),
				});
			} else {
				return Promise.reject(new Error("Unknown API endpoint"));
			}
		});

		render(<Chart stockCode={mockStockCode} />);

		// Check if loading state is rendered
		expect(screen.getByText("Loading...")).toBeInTheDocument();

		// Wait for the chart data and price info to be fetched and rendered
		await waitFor(() => {
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
		});

		// Verify that the chart and price info are rendered
		// Check if chart data related elements are rendered
		// Note: Adjust the expected elements based on your ChartDiagram component's implementation
		expect(screen.getByText("Chart Diagram")).toBeInTheDocument(); // Assuming this is a title or similar

		// Check if real-time price and summary data are rendered
		expect(screen.getByText("155.00")).toBeInTheDocument();
		expect(screen.getByText("5.00")).toBeInTheDocument();
		expect(screen.getByText("+")).toBeInTheDocument();
	});

	test("handles periodDiv state changes", async () => {
		// This would require interaction tests to simulate period changes
		// Add logic here if you have interactive elements or methods to test
	});
});
