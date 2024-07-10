import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfitRatio from "../components/ProfitRatio";
import ProfitRatioQuartly from "../components/ProfitRatioQuartly";

// Mock the ProfitRatioQuartly component
jest.mock("../components/ProfitRatioQuartly", () => {
	return (props) => (
		<div>
			<h1>ProfitRatioQuartly Component</h1>
			<div>Current Data: {JSON.stringify(props.curProfitRatioData)}</div>
			<div>Previous Data: {JSON.stringify(props.previousProfitRatioData)}</div>
		</div>
	);
});

const mockProfitRatioData = [
	{ stacYymm: "2024-06", saleNtinRate: 12, cptlNtinRate: 8, selfCptlNtinInrt: 6 },
	{ stacYymm: "2024-03", saleNtinRate: 10, cptlNtinRate: 7, selfCptlNtinInrt: 5 },
	{ stacYymm: "2023-12", saleNtinRate: 11, cptlNtinRate: 7.5, selfCptlNtinInrt: 5.5 },
	{ stacYymm: "2023-09", saleNtinRate: 13, cptlNtinRate: 8.5, selfCptlNtinInrt: 6.5 },
	{ stacYymm: "2023-06", saleNtinRate: 14, cptlNtinRate: 9, selfCptlNtinInrt: 7 },
	{ stacYymm: "2023-03", saleNtinRate: 15, cptlNtinRate: 9.5, selfCptlNtinInrt: 7.5 },
	{ stacYymm: "2022-12", saleNtinRate: 16, cptlNtinRate: 10, selfCptlNtinInrt: 8 },
];

describe("ProfitRatio Component", () => {
	test("renders the BarChart and ProfitRatioQuartly correctly", () => {
		render(<ProfitRatio profitRatioData={mockProfitRatioData} />);

		// Check if the ProfitRatioQuartly component is rendered
		expect(screen.getByText("ProfitRatioQuartly Component")).toBeInTheDocument();

		// Check if the bar chart is rendered (Usually checked by ensuring the chart container is present)
		expect(screen.getByText("Current Data:")).toBeInTheDocument();
		expect(screen.getByText("Previous Data:")).toBeInTheDocument();
	});

	test("handles BarChart bar click event correctly", () => {
		render(<ProfitRatio profitRatioData={mockProfitRatioData} />);

		// Simulate clicking on the BarChart bars
		const bars = screen.getAllByRole("presentation");
		fireEvent.click(bars[0]);

		// Assert that the ProfitRatioQuartly component is updated
		expect(
			screen.getByText('Current Data: {"stacYymm":"2023-06","saleNtinRate":14,"cptlNtinRate":9,"selfCptlNtinInrt":7}'),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				'Previous Data: {"stacYymm":"2023-03","saleNtinRate":15,"cptlNtinRate":9.5,"selfCptlNtinInrt":7.5}',
			),
		).toBeInTheDocument();
	});
});
