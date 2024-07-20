import React from "react";
import { render, screen } from "@testing-library/react";
import IncomeStatementQuartly from "./IncomeStatementQuartly";
import { BalanceSheetData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	totalAset: 100000,
	cras: 50000,
	fxas: 50000,
	totalCptl: 30000,
	cpfn: 15000,
	totalLblt: 50000,
	flow_lblt: 20000,
	fix_lblt: 30000,
};

const mockPrevData = {
	stacYymm: "2024-07",
	totalAset: 95000,
	cras: 45000,
	fxas: 50000,
	totalCptl: 29000,
	cpfn: 14000,
	totalLblt: 51000,
	flow_lblt: 21000,
	fix_lblt: 30000,
};

test("renders IncomeStatementQuartly with correct values and percentage changes", () => {
	render(<IncomeStatementQuartly curBalanceSheetData={mockCurData} previousBalanceSheetData={mockPrevData} />);

	const formatValue = (value) => (value >= 10000 ? `${(value / 10000).toFixed(2)}조` : `${value.toFixed(2)}억`);
	const calculatePercentageChange = (current, previous) =>
		previous === 0 ? "N/A" : (((current - previous) / previous) * 100).toFixed(2) + "%";

	const labels = ["자산총계", "유동자산", "고정자산", "자본총계", "자본금", "부채총계", "유동부채", "고정부채"];
	const curValues = [100000, 50000, 50000, 30000, 15000, 50000, 20000, 30000];
	const prevValues = [95000, 45000, 50000, 29000, 14000, 51000, 21000, 30000];

	labels.forEach((label, index) => {
		expect(screen.getByText(label)).toBeInTheDocument();
		expect(screen.getByText(formatValue(curValues[index]))).toBeInTheDocument();
		expect(screen.getByText(calculatePercentageChange(curValues[index], prevValues[index]))).toBeInTheDocument();
	});
});
