import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BalanceSheet from "../components/BalanceSheet";
import BalanceSheetQuartly from "../components/BalanceSheetQuartly";
import { BarChart, Bar } from "recharts";

// Mock the BalanceSheetQuartly component
jest.mock("../components/BalanceSheetQuartly", () => {
	return (props) => (
		<div>
			<h1>BalanceSheetQuartly Component</h1>
			<div>Current Data: {JSON.stringify(props.curBalanceSheetData)}</div>
			<div>Previous Data: {JSON.stringify(props.previousBalanceSheetData)}</div>
		</div>
	);
});

const mockBalanceSheetData = [
	{ stacYymm: "2024-06", totalAset: 50000, totalLblt: 20000, totalCptl: 30000 },
	{ stacYymm: "2024-03", totalAset: 55000, totalLblt: 22000, totalCptl: 33000 },
	{ stacYymm: "2023-12", totalAset: 53000, totalLblt: 21000, totalCptl: 32000 },
	{ stacYymm: "2023-09", totalAset: 56000, totalLblt: 23000, totalCptl: 33000 },
	{ stacYymm: "2023-06", totalAset: 58000, totalLblt: 24000, totalCptl: 34000 },
	{ stacYymm: "2023-03", totalAset: 54000, totalLblt: 22000, totalCptl: 32000 },
	{ stacYymm: "2022-12", totalAset: 55000, totalLblt: 22500, totalCptl: 32500 },
];

describe("BalanceSheet Component", () => {
	test("renders the BarChart and BalanceSheetQuartly correctly", () => {
		render(<BalanceSheet balanceSheetData={mockBalanceSheetData} />);

		// Check if the chart is rendered
		expect(screen.getByText("BalanceSheetQuartly Component")).toBeInTheDocument();

		// Check if the bar chart is rendered (This is usually checked by ensuring the chart container is present)
		expect(screen.getByText("Current Data:")).toBeInTheDocument();
		expect(screen.getByText("Previous Data:")).toBeInTheDocument();
	});

	test("handles BarChart bar click event correctly", () => {
		render(<BalanceSheet balanceSheetData={mockBalanceSheetData} />);

		// Simulate clicking on the BarChart bars
		const bars = screen.getAllByRole("presentation");
		fireEvent.click(bars[0]);

		// Assert that the BalanceSheetQuartly component is updated
		expect(
			screen.getByText('Current Data: {"stacYymm":"2023-06","totalAset":58000,"totalLblt":24000,"totalCptl":34000}'),
		).toBeInTheDocument();
		expect(
			screen.getByText('Previous Data: {"stacYymm":"2023-03","totalAset":54000,"totalLblt":22000,"totalCptl":32000}'),
		).toBeInTheDocument();
	});
});
