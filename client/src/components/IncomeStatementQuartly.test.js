import React from "react";
import { render, screen } from "@testing-library/react";
import IncomeStatementQuartly from "./IncomeStatementQuartly";
import { IncomeStatementData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	saleAccount: 50000,
	saleCost: 30000,
	saleTotlPrfi: 20000,
	bsopPrti: 10000,
	opPrfi: 5000,
	thtrNtin: 2000,
};

const mockPrevData = {
	stacYymm: "2024-07",
	saleAccount: 45000,
	saleCost: 25000,
	saleTotlPrfi: 20000,
	bsopPrti: 9000,
	opPrfi: 4000,
	thtrNtin: 1500,
};

test("renders IncomeStatementQuartly with correct values and percentage changes", () => {
	render(<IncomeStatementQuartly curIncomeStatementData={mockCurData} previousIncomeStatementData={mockPrevData} />);

	const formatValue = (value) => (value >= 10000 ? `${(value / 10000).toFixed(2)}조` : `${value.toFixed(2)}억`);
	const calculatePercentageChange = (current, previous) =>
		previous === 0 ? "N/A" : (((current - previous) / previous) * 100).toFixed(2) + "%";

	const labels = ["매출액", "매출원가", "매출총이익", "영업이익", "경상이익", "당기순이익"];
	const curValues = [50000, 30000, 20000, 10000, 5000, 2000];
	const prevValues = [45000, 25000, 20000, 9000, 4000, 1500];

	labels.forEach((label, index) => {
		expect(screen.getByText(label)).toBeInTheDocument();
		expect(screen.getByText(formatValue(curValues[index]))).toBeInTheDocument();
		expect(screen.getByText(calculatePercentageChange(curValues[index], prevValues[index]))).toBeInTheDocument();
	});
});
