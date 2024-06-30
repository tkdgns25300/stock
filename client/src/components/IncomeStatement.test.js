import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import IncomeStatement from "../components/IncomeStatement";
import IncomeStatementQuartly from "../components/IncomeStatementQuartly";
import { BarChart, Bar } from "recharts";

// Mock the IncomeStatementQuartly component
jest.mock("../components/IncomeStatementQuartly", () => {
	return (props) => (
		<div>
			<h1>IncomeStatementQuartly Component</h1>
			<div>Current Data: {JSON.stringify(props.curIncomeStatementData)}</div>
			<div>Previous Data: {JSON.stringify(props.previousIncomeStatementData)}</div>
		</div>
	);
});

const mockIncomeStatementData = [
	{ stacYymm: "2024-06", saleAccount: 10000, bsopPrti: 5000, thtrNtin: 3000 },
	{ stacYymm: "2024-03", saleAccount: 12000, bsopPrti: 6000, thtrNtin: 3500 },
	{ stacYymm: "2023-12", saleAccount: 11000, bsopPrti: 5500, thtrNtin: 3200 },
	{ stacYymm: "2023-09", saleAccount: 13000, bsopPrti: 7000, thtrNtin: 4000 },
	{ stacYymm: "2023-06", saleAccount: 14000, bsopPrti: 7500, thtrNtin: 4500 },
	{ stacYymm: "2023-03", saleAccount: 12500, bsopPrti: 6500, thtrNtin: 3700 },
	{ stacYymm: "2022-12", saleAccount: 13500, bsopPrti: 6800, thtrNtin: 4200 },
];

describe("IncomeStatement Component", () => {
	test("renders the BarChart and IncomeStatementQuartly correctly", () => {
		render(<IncomeStatement incomeStatementData={mockIncomeStatementData} />);

		// Check if the chart is rendered
		expect(screen.getByText("IncomeStatementQuartly Component")).toBeInTheDocument();

		// Check if the bar chart is rendered (This is usually checked by ensuring the chart container is present)
		expect(screen.getByText("Current Data:")).toBeInTheDocument();
		expect(screen.getByText("Previous Data:")).toBeInTheDocument();
	});

	test("handles BarChart bar click event correctly", () => {
		render(<IncomeStatement incomeStatementData={mockIncomeStatementData} />);

		// Simulate clicking on the BarChart bars
		const bars = screen.getAllByRole("presentation");
		fireEvent.click(bars[0]);

		// Assert that the IncomeStatementQuartly component is updated
		expect(
			screen.getByText('Current Data: {"stacYymm":"2023-06","saleAccount":14000,"bsopPrti":7500,"thtrNtin":4500}'),
		).toBeInTheDocument();
		expect(
			screen.getByText('Previous Data: {"stacYymm":"2023-03","saleAccount":12500,"bsopPrti":6500,"thtrNtin":3700}'),
		).toBeInTheDocument();
	});
});
