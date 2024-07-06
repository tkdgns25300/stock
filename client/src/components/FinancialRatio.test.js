import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FinancialRatio from "../components/FinancialRatio";
import FinancialRatioQuartly from "../components/FinancialRatioQuartly";

// Mock the FinancialRatioQuartly component
jest.mock("../components/FinancialRatioQuartly", () => {
	return (props) => (
		<div>
			<h1>FinancialRatioQuartly Component</h1>
			<div>Current Data: {JSON.stringify(props.curFinancialRatioData)}</div>
			<div>Previous Data: {JSON.stringify(props.previousFinancialRatioData)}</div>
		</div>
	);
});

const mockFinancialRatioData = [
	{ stacYymm: "2024-06", grs: 10, bsopPrfiInrt: 5, ntinInrt: 8 },
	{ stacYymm: "2024-03", grs: 12, bsopPrfiInrt: 6, ntinInrt: 9 },
	{ stacYymm: "2023-12", grs: 11, bsopPrfiInrt: 5.5, ntinInrt: 7.5 },
	{ stacYymm: "2023-09", grs: 13, bsopPrfiInrt: 6.5, ntinInrt: 8.5 },
	{ stacYymm: "2023-06", grs: 14, bsopPrfiInrt: 7, ntinInrt: 9 },
	{ stacYymm: "2023-03", grs: 15, bsopPrfiInrt: 7.5, ntinInrt: 9.5 },
	{ stacYymm: "2022-12", grs: 16, bsopPrfiInrt: 8, ntinInrt: 10 },
];

describe("FinancialRatio Component", () => {
	test("renders the BarChart and FinancialRatioQuartly correctly", () => {
		render(<FinancialRatio financialRatioData={mockFinancialRatioData} />);

		// Check if the FinancialRatioQuartly component is rendered
		expect(screen.getByText("FinancialRatioQuartly Component")).toBeInTheDocument();

		// Check if the bar chart is rendered (This is usually checked by ensuring the chart container is present)
		expect(screen.getByText("Current Data:")).toBeInTheDocument();
		expect(screen.getByText("Previous Data:")).toBeInTheDocument();
	});

	test("handles BarChart bar click event correctly", () => {
		render(<FinancialRatio financialRatioData={mockFinancialRatioData} />);

		// Simulate clicking on the BarChart bars
		const bars = screen.getAllByRole("presentation");
		fireEvent.click(bars[0]);

		// Assert that the FinancialRatioQuartly component is updated
		expect(
			screen.getByText('Current Data: {"stacYymm":"2023-06","grs":14,"bsopPrfiInrt":7,"ntinInrt":9}'),
		).toBeInTheDocument();
		expect(
			screen.getByText('Previous Data: {"stacYymm":"2023-03","grs":15,"bsopPrfiInrt":7.5,"ntinInrt":9.5}'),
		).toBeInTheDocument();
	});
});
