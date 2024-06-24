import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChartRealTimePrice from "../components/ChartRealTimePrice";

const mockRealTimePriceData = {
	currentPrice: 150000,
	prdyVrss: 1000,
	prdyVrssSign: 1,
};

describe("ChartRealTimePrice Component", () => {
	test("renders current price and percentage change", () => {
		render(<ChartRealTimePrice stockCode="005930" realTimePriceData={mockRealTimePriceData} />);

		expect(screen.getByText("₩150,000")).toBeInTheDocument();

		const percentageChange = (
			(mockRealTimePriceData.prdyVrss / (mockRealTimePriceData.currentPrice - mockRealTimePriceData.prdyVrss)) *
			100
		).toFixed(2);
		expect(screen.getByText(`${percentageChange}%`)).toBeInTheDocument();
	});

	test("updates price and percentage correctly", () => {
		const { rerender } = render(
			<ChartRealTimePrice stockCode="005930" realTimePriceData={{ ...mockRealTimePriceData, currentPrice: 160000 }} />,
		);

		expect(screen.getByText("₩160,000")).toBeInTheDocument();

		const newPercentageChange = (
			(mockRealTimePriceData.prdyVrss / (160000 - mockRealTimePriceData.prdyVrss)) *
			100
		).toFixed(2);
		expect(screen.getByText(`${newPercentageChange}%`)).toBeInTheDocument();

		rerender(
			<ChartRealTimePrice
				stockCode="005930"
				realTimePriceData={{ ...mockRealTimePriceData, currentPrice: 140000, prdyVrssSign: 2 }}
			/>,
		);

		expect(screen.getByText("₩140,000")).toBeInTheDocument();
		const updatedPercentageChange = (
			(mockRealTimePriceData.prdyVrss / (140000 - mockRealTimePriceData.prdyVrss)) *
			100
		).toFixed(2);
		expect(screen.getByText(`${updatedPercentageChange}%`)).toBeInTheDocument();
	});

	test("applies correct styling based on prdyVrssSign", () => {
		render(<ChartRealTimePrice stockCode="005930" realTimePriceData={{ ...mockRealTimePriceData, prdyVrssSign: 3 }} />);
		expect(screen.getByText("0.67%")).toHaveClass("bg-gray-300 text-gray-700");

		render(<ChartRealTimePrice stockCode="005930" realTimePriceData={{ ...mockRealTimePriceData, prdyVrssSign: 4 }} />);
		expect(screen.getByText("0.67%")).toHaveClass("bg-blue-300 text-blue-700");

		render(<ChartRealTimePrice stockCode="005930" realTimePriceData={{ ...mockRealTimePriceData, prdyVrssSign: 2 }} />);
		expect(screen.getByText("0.67%")).toHaveClass("bg-red-300 text-red-700");
	});
});
